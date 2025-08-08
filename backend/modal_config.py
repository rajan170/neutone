import modal

app = modal.App(name="neutone")

image = (
    modal.Image.debian_slim(python_version="3.11")
    .apt_install("git", "ffmpeg", "libsndfile1", "build-essential")
    .pip_install_from_requirements("requirements.txt")
    .run_commands(
        [
            "git clone https://github.com/ace-step/ACE-Step.git /opt/ACE-Step && pip install -r /opt/ACE-Step/requirements.txt && pip install -e /opt/ACE-Step",
        ]
    ).env({"HF_HOME": "/.cache/huggingface"})
    .add_local_python_source("modal_config")
    .add_local_python_source("MusicGenServer")
    .add_local_python_source("GenerateMusic")
    .add_local_python_source("prompts")
    .add_local_python_source("AudioGenBase")
)

model_volume = modal.Volume.from_name("ace-step-models", create_if_missing=True)
hf_volume = modal.Volume.from_name("qwen-hf-cache", create_if_missing=True)

neutone_secrets = modal.Secret.from_name("neutone-secrets")