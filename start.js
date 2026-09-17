module.exports = {
  requires: {
    bundle: "ai"
  },
  daemon: true,
  run: [
    {
      method: "shell.run",
      params: {
        venv: "venv",
        path: "app",
        // 0.0.0.0 on purpose: phones on the same wifi (and the Android app) have to reach it.
        // Nothing is published to the internet; away from home goes through Tailscale.
        env: {
          TF_HOST: "0.0.0.0",
          TF_PORT: "8410",
          TF_VOICES: "0",
          TF_PERSONAL: "0",
          PYTHONIOENCODING: "utf-8"
        },
        message: [
          "python server.py"
        ],
        on: [{
          event: "/(http:\\/\\/[0-9.:]+)/",
          done: true
        }]
      }
    },
    {
      method: "local.set",
      params: {
        url: "{{input.event[1]}}"
      }
    }
  ]
}
