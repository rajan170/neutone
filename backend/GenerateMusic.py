from pydantic import BaseModel

class GenerateMusicResponse(BaseModel):
    audio_data: str