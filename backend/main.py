import modal
import os
import requests
import base64

from AudioGenBase import GenerateFromCustomLyricsRequest, GenerateFromDescriptionRequest, GenerateMusicResponseS3
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
    endpoint_url = server.generate_from_lyrics.get_web_url()

    request = GenerateFromCustomLyricsRequest(
        prompt="trap, hiphop",
        
        lyrics = """ 
                        [Verse]
                I don't care about the view
                'Cause I exist for me and you
                I live my whole life in this planter
                I can't find my car so just call me the
                Horny gardener

                [Verse 2]
                Mayflies land on me and tell me they just moved to town
                Remind me of my cousin Dottie she could put five hundred seeds down
                Used to have a little guy sit beside me but he died in '22
                Hmm I think that I was that little guy
                Whoa Tongue slip it wasn't mutual

                [Chorus]
                Sticky green time in the flowery bob
                My top shelf's looking good enough to chew
                Right now every fly in the town is talking to me and buzzing too
                Daisy Daisy can you come outside to play or else
                I'll put a garden stake through you

                [Verse 3]
                All the buzzers lockin' up their stems and suckin' up their cuticles
                She breathes my air I got her light I'm like her cute little cubical
                Some caring soul in my seat might say I'm rotting away it's pitiful
                But she's the reason I go on and on and every single root'll crawl

                [Chorus]
                Sticky green time in the flowery bob
                My top shelf's looking good enough to chew
                Right now every fly in the town is talking to me and buzzing too
                Daisy Daisy can you come outside to play or else
                I'll put a garden stake through you
                Oh my pot
                Don't scrape
                Oh no

                [Verse 4]
                Ah hah ahhah ahhah oohhh
                Ah ahhahhahhah oh Hah
                Ohhh oooh Oooh ohhh
                Ah hhah Oh
                        """,
        guidance_scale=15,
    )

    payload = request.model_dump()

    response = requests.post(endpoint_url, json=payload)
    response.raise_for_status()
    result = GenerateMusicResponseS3(**response.json())

    print(f"Success: {result.s3_key} {result.cover_img_s3_key} {result.categories}")

    # audio_bytes = base64.b64decode(result.audio_data)
    # output_filename = "generated_music.wav"
    # with open(output_filename, "wb") as f:
    #     f.write(audio_bytes)
