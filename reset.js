// Throws away the installed Python environment so Install can build it again.
// The music model's weights (app/wan2gp/ckpts, about 13 GB) and everything you made
// - songs, channels, settings - are left alone.
module.exports = {
  run: [
    {
      method: "fs.rm",
      params: {
        path: "app/venv"
      }
    },
    {
      method: "notify",
      params: {
        html: "The Python environment is gone. Run Install to build it again; your songs and settings are still here."
      }
    }
  ]
}
