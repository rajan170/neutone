import modal
import os
import requests
import base64

from AudioGenBase import GenerateDescribedLyricsRequest, GenerateFromCustomLyricsRequest, GenerateFromDescriptionRequest, GenerateMusicResponseS3
from modal_config import app, image, neutone_secrets, model_volume, hf_volume
from MusicGenServer import MusicGenServer
from GenerateMusic import GenerateMusicResponse
from dotenv import load_dotenv



@app.local_entrypoint()
def main():
    # load_dotenv()

    # # Header name defaults to Modal's proxy auth header; can be overridden via env
    # modal_auth_header_name = os.getenv("MODAL_AUTH_HEADER", "Modal-Secret")
    # modal_secret_value = os.getenv("MODAL_SECRET")

    # if not modal_secret_value:
    #     raise RuntimeError(
    #         "Missing MODAL_SECRET environment variable. Set it in your environment or .env file."
    #     )


    
    headers = {"Modal-Key": "*****************",
                "Modal-Secret": "*****************"}


    server = MusicGenServer()
    endpoint_url = server.generate_from_described_lyrics.get_web_url()

    

    request = GenerateDescribedLyricsRequest(
        prompt="trap, hiphop, gangsta rap, 140BPM",
        described_lyrics="lyrics about a boy from the hood",
        guidance_scale=15,
    )

    payload = request.model_dump()

    response = requests.post(endpoint_url, json=payload, headers=headers)
    response.raise_for_status()
    result = GenerateMusicResponseS3(**response.json())

    print(f"Success: {result.s3_key} {result.cover_img_s3_key} {result.categories}")

    # audio_bytes = base64.b64decode(result.audio_data)
    # output_filename = "generated_music.wav"
    # with open(output_filename, "wb") as f:
    #     f.write(audio_bytes)
