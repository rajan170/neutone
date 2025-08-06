from transformers import AutoTokenizer, AutoModelForCausalLM
from diffusers import AutoPipelineForText2Image
from acestep.pipeline_ace_step import ACEStepPipeline
import torch

from modal_config import app, image

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
        pipe = AutoPipelineForText2Image.from_pretrained(
            "stabilityai/sdxl-turbo", torch_dtype="torch.float16", variant="fp16", cache_dir="/root/cache/huggingface"
        )
        pipe.to("cuda")