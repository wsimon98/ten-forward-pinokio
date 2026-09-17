const path = require('path')
module.exports = {
  version: "8.0",
  title: "Ten Forward",
  description: "Your own AI radio. It writes the lyrics, sings them with YuE2 on your own graphics card, and keeps twelve channels stocked so there is always something new on. Web page for any browser, plus an Android app that is just the dial. Nothing is uploaded anywhere.",
  icon: "icon.png",
  menu: async (kernel, info) => {
    let installed = info.exists("app/venv")
    let running = {
      install: info.running("install.js"),
      start: info.running("start.js"),
      update: info.running("update.js"),
      reset: info.running("reset.js")
    }
    if (running.install) {
      return [{
        default: true,
        icon: "fa-solid fa-plug",
        text: "Installing",
        href: "install.js",
      }]
    } else if (running.update) {
      return [{
        default: true,
        icon: 'fa-solid fa-terminal',
        text: "Updating",
        href: "update.js",
      }]
    } else if (running.reset) {
      return [{
        default: true,
        icon: 'fa-solid fa-terminal',
        text: "Resetting",
        href: "reset.js",
      }]
    } else if (installed) {
      if (running.start) {
        let local = info.local("start.js")
        if (local && local.url) {
          return [{
            default: true,
            icon: "fa-solid fa-radio",
            text: "Open Ten Forward",
            href: local.url,
          }, {
            icon: "fa-solid fa-mobile-screen",
            text: "Phone app (APK)",
            href: local.url + "/app/TenForward.apk",
          }, {
            icon: 'fa-solid fa-terminal',
            text: "Terminal",
            href: "start.js",
          }]
        } else {
          return [{
            default: true,
            icon: 'fa-solid fa-terminal',
            text: "Terminal",
            href: "start.js",
          }]
        }
      } else {
        return [{
          default: true,
          icon: "fa-solid fa-power-off",
          text: "Start",
          href: "start.js",
        }, {
          icon: "fa-regular fa-folder-open",
          text: "Songs you kept",
          href: "app/songs",
          fs: true
        }, {
          icon: "fa-regular fa-folder-open",
          text: "Put your own lyrics here",
          href: "app/lyrics",
          fs: true
        }, {
          icon: "fa-solid fa-plug",
          text: "Update",
          href: "update.js",
        }, {
          icon: "fa-solid fa-plug",
          text: "Install",
          href: "install.js",
        }, {
          icon: "fa-regular fa-circle-xmark",
          text: "<div><strong>Reset</strong><div>Rebuild the Python environment (songs and settings are kept)</div></div>",
          href: "reset.js",
          confirm: "Rebuild the Python environment? Your songs, channels and settings are not touched."
        }]
      }
    } else {
      return [{
        default: true,
        icon: "fa-solid fa-plug",
        text: "Install",
        href: "install.js",
      }]
    }
  }
}
