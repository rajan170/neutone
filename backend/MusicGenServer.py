import base64
import uuid
from transformers import AutoTokenizer, AutoModelForCausalLM
from diffusers import AutoPipelineForText2Image
from acestep.pipeline_ace_step import ACEStepPipeline
import torch
import os
import modal
from modal_config import app, image, model_volume, hf_volume, neutone_secrets

@app.cls(
    image=image,
    gpu="L40S",
    volumes={"/models": model_volume,
    "/root/cache/huggingface":hf_volume,
    "secrets":neutone_secrets},
    scaledown_window=15
)
class MusicGenServer:
    def load_model(self):
        

        # Musci Gen Model
        self.music_model = ACEStepPipeline(
            checkpoint_dir="/models",
            dtype="bfloat16",
            torch_compile=False,
            cpu_offload=False,
            overlapped_decoder=False
        )

        # Large Language Model
        model_id = "Qwen/Qwen2.5-7B-Instruct" # use Qwen2 if err
        self.tokenizer = AutoTokenizer.from_pretrained(model_id)

        self.llm_model = AutoModelForCausalLM(
            model_id,
            torch_dtype="auto",
            device_map="auto",
            cache_dir="/root/cache/huggingface",
        )

        # Stable Diffusion Model (for generating thumbnails)
        self.image_pipe = AutoPipelineForText2Image.from_pretrained(
            "stabilityai/sdxl-turbo",
            torch_dtype="torch.float16", 
            variant="fp16", 
            cache_dir="/root/cache/huggingface"
        )
        self.image_pipe.to("cuda")
    
    @modal.fastapi_endpoint(method="POST")
    def generate(self):
        output_dir = "/tmp/outputs"
        os.mkdir(output_dir, exist_ok = True)
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