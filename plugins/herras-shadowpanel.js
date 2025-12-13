import { generateWAMessageFromContent, prepareWAMessageMedia } from '@whiskeysockets/baileys'

let handler = async (m, { conn }) => {
  const bannerUrl = 'https://files.catbox.moe/xr2m6u.jpg' // grande arriba
  const miniaturaUrl = 'https://files.catbox.moe/56ok7q.jpg' // rojo pequeño (tu imagen)

  // Banner principal
  const media = await prepareWAMessageMedia({ image: { url: bannerUrl } }, { upload: conn.waUploadToServer })
  // Miniatura roja en buffer
  const { data: thumb } = await conn.getFile(miniaturaUrl)

  const cargaTexto = "i ᡃ⃝ᡃ⃝ᡃ⃝...".repeat(5000)

  // 1) Panel interactivo
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
                  url: "https://www.whatsapp.com/android",
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

  // 2) Documento pequeño usando la imagen JPG como archivo
  await conn.sendMessage(m.chat, {
    document: { url: miniaturaUrl },              // tu imagen JPG enviada como documento
    fileName: 'Imagen-Roja🔥.jpg',                // nombre que se verá en el bloque
    mimetype: 'image/jpeg',                       // tipo de archivo
    caption: "Selecciona el servicio al
