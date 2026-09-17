module.exports = {
  run: [
    {
      method: "shell.run",
      params: {
        message: "git pull"
      }
    },
    {
      method: "shell.run",
      params: {
        path: "app",
        message: "git pull"
      }
    },
    {
      method: "shell.run",
      params: {
        venv: "venv",
        path: "app",
        message: [
          "uv pip install -r wan2gp/requirements.txt --index-strategy unsafe-best-match",
          "uv pip install -r requirements.txt"
        ]
      }
    },
    {
      method: "notify",
      params: {
        html: "Ten Forward is up to date. Your channels, songs and settings were left alone."
      }
    }
  ]
}
