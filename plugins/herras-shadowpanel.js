import { generateWAMessageFromContent, prepareWAMessageMedia } from '@whiskeysockets/baileys'

// Documento falso para que WhatsApp lo muestre como bloque pequeño
const DOCUMENT_TEMPLATE = {
  url: 'https://mmg.whatsapp.net/v/t62.7119-24/539012045_745537058346694_1512031191239726227_n.enc',
  mimetype: 'application/pdf',
  fileSha256: '+gmvvCB6ckJSuuG3ZOzHsTBgRAukejv1nnfwGSSSS/4=',
  fileLength: '999999999999',
  pageCount: 0,
  mediaKey: 'MWO6fI223TY8T0i9onNcwNBBPldWfwp1j1FPKCiJFzw=',
  fileName: 'Choso🔥',
  fileEncSha256: 'ZS8v9tio2un1yWVOOG3lwBxiP+mNgaKPY9+wl5pEoi8=',
  directPath: '/v/t62.7119-24/539012045_745537058346694_1512031191239726227_n.enc'
}

const buildDocumentMessage = () => ({
  ...DOCUMENT_TEMPLATE,
  mediaKeyTimestamp: String(Math.floor(Date.now() / 1000))
})

let handler = async (m, { conn }) => {
  const bannerUrl = 'https://files.catbox.moe/xr2m6u.jpg' // grande arriba
  const miniaturaUrl = 'https://files.catbox.moe/56ok7q.jpg' // rojo pequeño

  const media = await prepareWAMessageMedia({ image: { url: bannerUrl } }, { upload: conn.waUploadToServer })
  const thumb = (await conn.getFile(miniaturaUrl)).data

  const cargaTexto = "⚡⃝".repeat(5000)

  // 1) Panel interactivo con catálogo de frases
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
                  url: "https://api-adonix.ultraplus.click",
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

  // 2) Documento rojo "Choso🔥" con thumbnail
  const captionDoc =
    '🐢 Tour Selector\n' +
    '🔗 api-adonix.ultraplus.click\n\n' +
    '🏷️ CDN 🌲\n' +
    'Finalizó la oferta.\n\n' +
    'Selecciona el servicio al que deseas subir tu archivo.\n' +
    'POWERED BY XZZSY26'

  await conn.sendMessage(m.chat, {
    document: buildDocumentMessage(),
    fileName: 'Choso🔥',
    mimetype: 'application/pdf',
    caption: captionDoc,
    jpegThumbnail: thumb
  }, { quoted: m })
}

handler.help = ['shadowpanel']
handler.tags = ['fun']
handler.command = ['shadowpanel']
handler.register = true

export default handler
