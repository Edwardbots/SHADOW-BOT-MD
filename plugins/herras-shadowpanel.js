import { generateWAMessageFromContent } from '@whiskeysockets/baileys'

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

const menuDoc = async (m, { conn }) => {
  const documentMessage = buildDocumentMessage()

  // Secciones para el menú
  const sections = [
    {
      title: 'Opciones principales',
      rows: [
        { title: '✨ Generar sticker', rowId: 'sticker' },
        { title: '🎥 Crear vídeo brat', rowId: 'bratv' },
        { title: '📄 Ver documento', rowId: 'docprueba' }
      ]
    }
  ]

  // Construye el mensaje interactivo con documento + lista
  const msg = generateWAMessageFromContent(m.chat, {
    interactiveMessage: {
      body: { text: 'Menú dramático con documento 🔥' },
      footer: { text: 'Selecciona una opción' },
      header: { hasMediaAttachment: true, documentMessage },
      nativeFlowMessage: {
        buttons: [
          {
            name: 'single_select',
            buttonParamsJson: JSON.stringify({
              title: 'Abrir menú',
              sections
            })
          }
        ]
      }
    }
  }, { userJid: m.sender })

  await conn.relayMessage(m.chat, msg.message, { messageId: msg.key.id })
}

menuDoc.help = ['menudoc']
menuDoc.tags = ['tools']
menuDoc.command = /^menudoc$/i

export default menuDoc
