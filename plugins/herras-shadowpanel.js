import { generateWAMessageFromContent, proto } from '@whiskeysockets/baileys'

let handler = async (m, { conn }) => {
  const content = {
    viewOnceMessage: {
      message: {
        interactiveMessage: {
          header: {
            title: "🎄 Shadow-BOT-MD",
            hasMediaAttachment: false,
          },
          body: {
            text: "✨ Bienvenido al panel interactivo navideño.\nSelecciona una opción:",
          },
          footer: {
            text: "⚔️ The Eminence in Shadow 🎅",
          },
          nativeFlowMessage: {
            buttons: [
              {
                name: "cta_url",
                buttonParamsJson: JSON.stringify({
                  display_text: "Visitar Canal Oficial 💚",
                  url: "https://whatsapp.com/channel/0029VbArz9fAO7RGy2915k3O",
                }),
              },
              {
                name: "quick_reply",
                buttonParamsJson: JSON.stringify({
                  display_text: "OK 🎁",
                  id: "btn_ok",
                }),
              },
            ],
          },
        },
      },
    },
  }

  const msg = generateWAMessageFromContent(m.chat, content, { userJid: m.sender })
  await conn.relayMessage(m.chat, msg.message, { messageId: msg.key.id })
}

handler.help = ['shadowpanel']
handler.tags = ['fun']
handler.command = ['shadowpanel']
handler.register = true

export default handler
