export async function before(m, { conn, isAdmin, isBotAdmin, isOwner, isROwner }) {
  if (m.isBaileys && m.fromMe) return true;
  if (m.isGroup) return false;
  if (!m.message) return true;

  const chat = global.db.data.chats[m.chat];
  const bot = global.db.data.settings[conn.user.jid] || {};

  // Lista de palabras clave a detectar
  const palabrasClave = ['PIEDRA', 'PAPEL', 'TIJERA', 'serbot', 'jadibot'];

  if (palabrasClave.some((palabra) => m.text.includes(palabra))) return true;
  if (m.chat === '120363416409380841@newsletter') return true;

  // Excepción: nunca bloquear al creador
  const creador = '+5804242773183';
  if (m.sender.includes(creador.replace('+', ''))) return true;

  // Bloqueo de chats privados solo si usan comandos
  if (bot.antiPrivate && !isOwner && !isROwner) {
    // Detectar si el mensaje es un comando (empieza con el prefijo del bot)
    const prefixRegex = /^[!/#$.]/; // ajusta según tus prefijos
    if (prefixRegex.test(m.text)) {
      const grupoURL = 'https://chat.whatsapp.com/ETHW7aP7kOICrR2RBrfE6N'; // enlace de grupo
      const nombreUsuario = await conn.getName(m.sender);
      const mensajeBloqueo = `⚠️ *Hola ${nombreUsuario}*, mi creador ha desactivado los comandos en chats privados.\n\nPor lo tanto, serás bloqueado automáticamente.\n\n🌌 *Únete al grupo oficial para usar el bot:*\n${grupoURL}`;
      const imagenURL = 'https://files.catbox.moe/y6hfiv.jpg';

      await conn.sendFile(m.chat, imagenURL, 'antiprivado.jpg', mensajeBloqueo, m, false, { mentions: [m.sender]});
      await conn.updateBlockStatus(m.chat, 'block');
    }
  }

  return false;
}
