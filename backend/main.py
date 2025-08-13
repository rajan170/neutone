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
    load_dotenv()

    modal_key = os.getenv("Modal-Key")
    modal_secret = os.getenv("Modal-Secret")

    headers = {"Modal-Key": modal_key,
                "Modal-Secret": modal_secret}


    server = MusicGenServer()
    endpoint_url = server.generate_from_described_lyrics.get_web_url()

    # Generate music from described lyrics
    request = GenerateDescribedLyricsRequest(
        prompt="trap, hiphop, gangsta rap, 140BPM",
        described_lyrics="lyrics about a boy from the hood",
        guidance_scale=15,
    )

    payload = request.model_dump()  # Convert the request to a dictionary 

    response = requests.post(endpoint_url, json=payload, headers=headers)
    response.raise_for_status()
    result = GenerateMusicResponseS3(**response.json())

    print(f"Success: {result.s3_key} {result.cover_img_s3_key} {result.categories}")
