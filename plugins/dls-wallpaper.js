import { wallpaper } from '@bochilteam/scraper'

let handler = async (m, { conn, text, usedPrefix, command }) => {
  if (!text) throw `🎭 Falta tu búsqueda, sombra...\nEjemplo: ${usedPrefix + command} Eminence | Navidad`

  try {
    const res = await (/2/.test(command) ? wallpaperv2 : wallpaper)(text)
    const img = res[Math.floor(Math.random() * res.length)]
    let link = img

    conn.sendButton(
      m.chat,
      `❄️✨ La sombra sonríe entre luces festivas...\n🔎 Búsqueda: *${text}*`,
      `⚔️ Shadow-BOT-MD • Panel navideño 🎄`,
      img,
      [
        ['🔄 Siguiente sombra', `${usedPrefix + command} ${text}`],
        ['🎄 Pinterest navideño', `#pinterest ${text}`],
        ['👻 Google sombrío', `#image ${text}`]
      ],
      null,
      null,
      fkontak
    )

    // Alternativa: enviar archivo directo
    // conn.sendFile(m.chat, img, 'shadow.jpg', `❄️✨ Resultado navideño: ${text}\n⚔️ Shadow-BOT-MD`, m)

  } catch (e) {
    await conn.reply(
      m.chat,
      `⚠️ La sombra encontró un error...\n#report ${usedPrefix + command}\n🎄 Intenta de nuevo bajo las luces festivas.`,
      m
    )
    console.log(`❗ Error en comando ${usedPrefix + command}`)
    console.log(e)
    handler.limit = false
  }
}

handler.help = ['', '2'].map((v) => 'wallpaper' + v + ' <query>')
handler.tags = ['downloader']
handler.command = /^(wp|wallpaper2?)$/i
handler.register = true
handler.limit = 1
handler.level = 3

export default handler
