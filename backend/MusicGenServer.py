import base64
import uuid
import os
import modal
from modal_config import app, image, model_volume, hf_volume, neutone_secrets

from GenerateMusic import GenerateMusicResponse
from AudioGenBase import GenerateFromDescriptionRequest, GenerateFromCustomLyricsRequest, GenerateDescribedLyricsRequest, GenerateMusicResponseS3
from prompts import PROMPT_GENERATOR_PROMPT

@app.cls(
    image=image,
    gpu="L40S",
    volumes={"/models": model_volume,
    "/root/cache/huggingface":hf_volume},
    secrets=[neutone_secrets],
    scaledown_window=15)
class MusicGenServer:
    @modal.enter()
    def _startup(self):
        self.load_model()

    def load_model(self):
        from transformers import AutoTokenizer, AutoModelForCausalLM
        from diffusers import AutoPipelineForText2Image
        from acestep.pipeline_ace_step import ACEStepPipeline
        import torch

        # Music Gen Model
        self.music_model = ACEStepPipeline(
            checkpoint_dir="/models",
            dtype="bfloat16",
            torch_compile=False,
            cpu_offload=False,
            overlapped_decoder=False
        )

        # Large Language Model
        model_id = "Qwen/Qwen2.5-7B-Instruct" 
        self.tokenizer = AutoTokenizer.from_pretrained(model_id)

        self.llm_model = AutoModelForCausalLM.from_pretrained(
            model_id,
            torch_dtype="auto",
            device_map="auto",
            cache_dir="/root/cache/huggingface",
        )

        # Stable Diffusion Model (for generating thumbnails)
        self.image_pipe = AutoPipelineForText2Image.from_pretrained(
            "stabilityai/sdxl-turbo",
            torch_dtype=torch.float16, 
            variant="fp16", 
            cache_dir="/root/cache/huggingface"
        )
        self.image_pipe.to("cuda")
    
    @modal.fastapi_endpoint(method="POST")
    def generate(self) -> GenerateMusicResponse:
        # Ensure model is available if container was cold-started without enter hook
        if not hasattr(self, "music_model"):
            self.load_model()

        output_dir = "/tmp/outputs"
        os.makedirs(output_dir, exist_ok = True)
        output_path = os.path.join(output_dir, f"{uuid.uuid4()}.wav")

        self.music_model(
            prompt = "A song about a cat, billie ellish",
            lyrics = "a cat's life",
            audio_duration = 100,
            infer_step = 60,
            guidance_scale = 15,
            save_path = output_path,
        )

        with open(output_path, "rb") as f:
            audio_bytes = f.read()

            audio_b64 = base64.b64encode(audio_bytes).decode("utf-8")

        os.remove(output_path)

        return GenerateMusicResponse(
            audio_data = audio_b64,
        )


    def prompt_qwen(self, question: str) -> str:
        
        messages = [
           
            {"role": "user", "content": question}
        ]
        text = self.tokenizer.apply_chat_template(
            messages,
            tokenize=False,
            add_generation_prompt=True
        )
        model_inputs = self.tokenizer([text], return_tensors="pt").to(self.llm_model.device)

        generated_ids = self.llm_model.generate(
            **model_inputs,
            max_new_tokens=512
        )
        generated_ids = [
            output_ids[len(input_ids):] for input_ids, output_ids in zip(model_inputs.input_ids, generated_ids)
        ]

        response = self.tokenizer.batch_decode(generated_ids, skip_special_tokens=True)[0]

        return response

    
    def generate_prompt(self, description: str) -> str:
        full_prompt = PROMPT_GENERATOR_PROMPT.format(user_prompt=description)
        
    

    @modal.fastapi_endpoint(method="POST")
    def generate_from_description(self, request: GenerateFromDescriptionRequest) -> GenerateMusicResponseS3:
        pass


    @modal.fastapi_endpoint(method="POST") 
    def generate_from_lyrics(self, request: GenerateFromCustomLyricsRequest) -> GenerateMusicResponseS3: 
        pass


    @modal.fastapi_endpoint(method="POST")
    def generate_from_described_lyrics(self, request: GenerateDescribedLyricsRequest) -> GenerateMusicResponseS3:
        pass