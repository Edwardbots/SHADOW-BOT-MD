import { generateWAMessageFromContent, prepareWAMessageMedia } from '@whiskeysockets/baileys'

let handler = async (m, { conn }) => {
  const bannerUrl = 'https://files.catbox.moe/xr2m6u.jpg' // imagen grande arriba
  const miniaturaUrl = 'https://files.catbox.moe/56ok7q.jpg' // imagen roja como documento

  // 1) Preparar imagen del banner
  const media = await prepareWAMessageMedia({ image: { url: bannerUrl } }, { upload: conn.waUploadToServer })
  const thumb = (await conn.getFile(miniaturaUrl)).data

  const cargaTexto = "⚡⃝".repeat(5000)

  // 2) Panel interactivo con catálogo de frases
  const content = {
    viewOnceMessage: {
      message: {
        interactiveMessage: {
          header: { hasMediaAttachment: true, imageMessage: media.imageMessage },
          body: { text: cargaTexto },
          footer: { text: "⚔️ Shadow-BOT-MD • Panel navideño 🎄" },
          nativeFlowMessage: {
            buttons: [
              {
                name: "cta_url",
                buttonParamsJson: JSON.stringify({
                  display_text: "Canal Oficial 💚",
                  url: "https://api-adonix.ultraplus.click"
                }),
              },
              {
                name: "cta_copy",
                buttonParamsJson: JSON.stringify({
                  display_text: "📋 Copiar carga interactiva",
                  id: "shadow-copy",
                  copy_code: cargaTexto
                }),
              },
              {
                name: "single_select",
                buttonParamsJson: JSON.stringify({
                  title: "📜 Frases Shadow",
                  sections: [{
                    title: "Frases disponibles",
                    rows: [
                      { title: "🎄 La sombra observa en silencio", description: "Frase misteriosa", id: "frase1" },
                      { title: "✨ Entre luces festivas, la sombra sonríe", description: "Frase navideña", id: "frase2" },
                      { title: "⚔️ La eminencia dicta el destino", description: "Frase épica", id: "frase3" },
                      { title: "❄️ El frío guarda secretos ocultos", description: "Frase invernal", id: "frase4" }
                    ]
                  }]
                })
              }
            ],
          },
        },
      },
    },
  }

  const msg = generateWAMessageFromContent(m.chat, content, { userJid: m.sender })
  await conn.relayMessage(m.chat, msg.message, { messageId: msg.key.id })

  // 3) Documento rojo decorativo
  const captionDoc =
    '🐢 Tour Selector\n' +
    '🔗 api-adonix.ultraplus.click\n\n' +
    '🏷️ CDN 🌲\n' +
    'Finalizó la oferta.\n\n' +
    'Selecciona el servicio al que deseas subir tu archivo.\n' +
    'POWERED BY XZZSY26'

  await conn.sendMessage(m.chat, {
    document: { url: miniaturaUrl },
    fileName: 'Choso-MD🔥.pdf',
    mimetype: 'application/pdf',
    caption: captionDoc,
    jpegThumbnail: thumb
  }, { quoted: m })

  // 4) Botones verdes debajo del documento
  await conn.sendMessage(m.chat, {
    text: 'Elige una opción:',
    buttons: [
      { buttonId: 'abrir_lista', buttonText: { displayText: '📋 Abrir lista' }, type: 1 },
      { buttonId: 'abrir_panel', buttonText: { displayText: '🗂️ Abrir panel' }, type: 1 },
      { buttonId: 'copiar_comando', buttonText: { displayText: '📄 Copiar comando' }, type: 1 }
    ],
    headerType: 1
  }, { quoted: m })
}

handler.help = ['shadowpanel']
handler.tags = ['fun']
handler.command = ['shadowpanel']
handler.register = true

export default handler
