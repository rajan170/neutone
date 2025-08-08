from sre_parse import CATEGORIES
from typing import List
from pydantic import BaseModel

class AudioGenerationBase(BaseModel):
    audio_duration: float = 180
    seed: int = -1
    guidance_scale: float = 15.0
    infer_step: int = 60

class GenerateFromDescriptionRequest(AudioGenerationBase):
    full_described_song: str

class GenerateFromCustomLyricsRequest(AudioGenerationBase):
    prompt: str 
    lyrics: str

class GenerateDescribedLyricsRequest(AudioGenerationBase):
    prompt: str
    described_lyrics: str

class GenerateMusicResponseS3(BaseModel):
    s3_key: str 
    cover_img_s3_key: str
    categories: List[str]

class GenerateMusicResposne(BaseModel):
    audio_data: str