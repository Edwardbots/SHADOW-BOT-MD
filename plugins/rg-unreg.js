let handlerUnreg = async (m, { conn, usedPrefix }) => {
  const user = global.db.data.users[m.sender]
  const pp = await conn.profilePictureUrl(m.sender, 'image').catch(() => 'https://files.catbox.moe/xr2m6u.jpg')

  if (!user.registered) {
    return m.reply('『⚠️』 No tienes ningún pacto activo...')
  }

  user.registered = false
  user.name = ''
  user.age = 0

  await conn.sendMessage(m.chat, {
    text: `『💀』 El sello ha sido roto...\n\n🌑 La sombra se disuelve en la oscuridad.`,
    contextInfo: {
      externalAdReply: {
        title: '☽ Sello Shadow Roto ☽',
        body: 'El pacto ha sido disuelto',
        thumbnailUrl: pp, // 👈 muestra la foto de perfil del que borró el registro
        sourceUrl: 'https://whatsapp.com/channel/0029Vb7GXFc9cDDW4i1gJY1m',
        mediaType: 1,
        renderLargerThumbnail: true
      }
    }
  }, { quoted: m })
}

handlerUnreg.help = ['unreg']
handlerUnreg.tags = ['rg']
handlerUnreg.command = ['unreg', 'borrarregistro', 'delreg']

export default handlerUnreg
