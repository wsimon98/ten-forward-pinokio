module.exports = {
  run: [
    {
      method: "shell.run",
      params: {
        message: "git pull"
      }
    },
    {
      // each release is published as one fresh commit, so "git pull" would refuse it (unrelated histories);
      // fetch it and move to it instead. Songs, the database and settings are not tracked, so they stay put.
      method: "shell.run",
      params: {
        path: "app",
        message: [
          "git fetch origin master",
          "git reset --hard FETCH_HEAD"
        ]
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
