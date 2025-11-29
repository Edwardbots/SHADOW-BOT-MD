let handler = async (m, { conn, usedPrefix, command, isROwner }) => {
  if (!isROwner) return
  try {
    await m.react('🎭') // reacción teatral inicial
    m.reply(`🌌 *Discípulo de las Sombras* 🎄\nEl ritual de reinicio ha comenzado...\n○ Invocando a *${botname}* જ⁀➴\n> ► Espera mientras el *Socket* renace en las sombras.`)
    await m.react('✔️')
    setTimeout(() => {
      if (process.send) {
        process.send("restart")
      } else {
        process.exit(0)
      }
    }, 3000)
  } catch (error) {
    await m.react('✖️')
    console.log(error)
    conn.reply(
      m.chat,
      `⚠️ El ritual falló...\n> Usa *${usedPrefix}report* para informarlo.\n\n${error.message}`,
      m
    )
  }
}

handler.help = ['restart']
handler.tags = ['owner']
handler.command = ['restart', 'reiniciar']

export default handler
