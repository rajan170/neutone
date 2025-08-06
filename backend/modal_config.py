import modal

app = modal.App(name="neutone")

image = (
    modal.Image.debian_slim()
    .apt_install("git")
    .pip_install_from_requirements("requirements.txt")
    .run_commands(
        [
            "git clone https://github.com/ace-step/ACE-Step.git /tmp/ACE-Step && cd /tmp/ACE-Step && pip install .",
        ]
    ).env({"HF_HOME": "/.cache/huggingface"})
    .add_local_python_source("prompts")
)

image = image.add_local_file("modal_config.py", "/root/modal_config.py").add_local_file("main.py", "/root/main.py")

model_volume = modal.Volume.from_name("ace-step-models", create_if_missing=True)
hf_volume = modal.Volume.from_name("qwen-hf-cache", create_if_missing=True)

neutone_secrets = modal.Secret.from_name("neutone-secrets")