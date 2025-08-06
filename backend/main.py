import modal
import os
from modal_config import app, image, neutone_secrets, model_volume

@app.cls(
    image=image,
    gpu="L40S",
    volumes={"/models": model_volume}
)
class MusicGenServer:
    def load_model(self):
        pass

    

@app.function(image=image, secrets=[neutone_secrets])
def test_func():
    print("Hello, World!")
    print(os.environ["test"])

@app.local_entrypoint()
def main():
    test_func.remote()