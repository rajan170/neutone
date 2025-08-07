import modal
import os
import requests
import base64

from modal_config import app, image, neutone_secrets, model_volume, hf_volume
from MusicGenServer import MusicGenServer
from GenerateMusic import GenerateMusicResponse

@app.function(image=image, secrets=[neutone_secrets])
def test_func():
    print("Hello, World!")
    print(os.environ["test"])

@app.local_entrypoint()
def main():
    server = MusicGenServer()
    endpoint_url = server.generate.get_web_url()

    response = requests.post(endpoint_url)
    response.raise_for_status()
    result = GenerateMusicResponse(**response.json())

    audio_bytes = base64.b64decode(result.audio_data)
    output_filename = "generated_music.wav"

    with open(output_filename, "wb") as f:
        f.write(audio_bytes)
