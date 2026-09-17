module.exports = {
  requires: {
    bundle: "ai"
  },
  run: [
    {
      when: "{{gpu === 'nvidia' && gpu_driver && Number.parseFloat(gpu_driver) < 580 && !(kernel.gpu_model && / (10|16)\\d+/.test(kernel.gpu_model))}}",
      method: "notify",
      params: {
        html: "Your NVIDIA driver ({{gpu_driver}}) is too old for CUDA 13. Update to R580 or newer, then run Install again."
      },
      next: null
    },
    {
      when: "{{!exists('app')}}",
      method: "shell.run",
      params: {
        message: "git clone https://github.com/wsimon98/ten-forward-release app"
      }
    },
    {
      when: "{{!exists('app/wan2gp')}}",
      method: "shell.run",
      params: {
        path: "app",
        message: [
          "git clone https://github.com/deepbeepmeep/Wan2GP wan2gp",
          "git -C wan2gp checkout 09a6c1dad469fc3a2dc7577b9ab0a08254be9ad2"
        ]
      }
    },
    {
      method: "script.start",
      params: {
        uri: "torch.js",
        params: {
          venv_python: "3.11",
          venv: "venv",
          path: "app",
          xformers: true
        }
      }
    },
    {
      method: "shell.run",
      params: {
        venv: "venv",
        path: "app",
        message: [
          "uv pip install -r wan2gp/requirements.txt --index-strategy unsafe-best-match",
          "uv pip install hf-xet pip comtypes",
          "uv pip install -r requirements.txt"
        ]
      }
    },
    {
      when: "{{platform === 'win32' && gpu === 'amd'}}",
      method: "shell.run",
      params: {
        venv: "venv",
        path: "app",
        message: "uv pip install numpy==1.26.4"
      }
    },
    {
      method: "notify",
      params: {
        html: "Ten Forward is installed. Press Start, then open Settings and point it at your Ollama. The music model downloads itself (13 GB) the first time a song is made."
      }
    }
  ]
}
