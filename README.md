# Ten Forward (Pinokio launcher)

Your own AI radio, on your own computer. It writes the lyrics, sings them with YuE2 on your graphics
card, and keeps twelve channels stocked so there is always something new on. There is a web page for a
computer or a phone browser, and an Android app that is only the dial.

## What Install does

1. Clones the app: `https://github.com/wsimon98/ten-forward-release` into `app`.
2. Clones the music engine: Wan2GP, pinned to commit `09a6c1d`, into `app/wan2gp`. That exact tree is the
   one Ten Forward is built against; a newer Wan2GP can change the API it calls.
3. Builds a Python 3.11 environment in `app/venv` with the right torch for your card (`torch.js`, the same
   one the Wan2GP launcher uses), then the requirements of both.

The music model's weights are **not** downloaded during install: Wan2GP fetches them (about 13 GB) the
first time a song is made, so the first song on a fresh install takes a while.

## What you need besides this

* An NVIDIA card. 24 GB is comfortable, 16 GB works with shorter songs.
* A lyric writer: [Ollama](https://ollama.com) with `qwen2.5:14b` (or `qwen2.5:7b` on a smaller card).
  Start it, pull the model, and check the address in Ten Forward's **Settings → Lyric writer**.
* Optional: [Tailscale](https://tailscale.com) on this computer and on your phone, if you want the radio
  when you are not at home. Run `app\tailscale_serve.ps1` once and put the address it prints into
  **Settings → Addresses**.

## Start

Press **Start**. The web page opens at `http://127.0.0.1:8410`. Phones and other machines on the same
wifi use this computer's own address, which the page shows under **Settings → The phone app**.

Ten Forward listens on `0.0.0.0` so those phones can reach it. That is a deliberate difference from most
Pinokio apps, which bind to localhost: a radio nobody can hear from the kitchen is not a radio. Nothing
is published to the internet — off-network listening goes through Tailscale, which is private to you.

The port is fixed at 8410 (not a random one) because the Android app remembers the address you typed in.
Change it in `start.js` if something else on your machine already uses 8410.

## The phone app

**Settings → The phone app** has the APK and the two addresses to type into it. The app is only the
dial: channels, what is playing, pause, skip, heart, sleep timer, with the controls on the lock screen.
Channels are made and changed on the web page.

## Reset

**Reset** deletes `app/venv` and nothing else. The model weights (`app/wan2gp/ckpts`, 13 GB) and
everything you made — songs, channels, settings, the database — stay where they are. Run Install after.

## Where your things live

```
app/library/    the songs it made
app/songs/      the ones you hearted, as plain .mp3 and .txt
app/lyrics/     your own lyrics, one song per file, in the channel's folder
app/data/       the database: channels, settings, who listens
```
