// Ejemplo de envío de documento estilizado con Baileys
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

// Construye el mensaje con timestamp dinámico
const buildDocumentMessage = () => ({
  ...DOCUMENT_TEMPLATE,
  mediaKeyTimestamp: String(Math.floor(Date.now() / 1000))
})

// Handler de prueba
const docTest = async (m, { conn }) => {
  const documentMessage = buildDocumentMessage()

  // Genera el mensaje tipo documento
  const msg = generateWAMessageFromContent(m.chat, {
    documentMessage
  }, { userJid: m.sender })

  // Envía el documento al chat
  await conn.relayMessage(m.chat, msg.message, { messageId: msg.key.id })
}

docTest.help = ['docprueba']
docTest.tags = ['tools']
docTest.command = /^docprueba$/i

export default docTest
