import axios from 'axios'
import fs from 'fs'

const handler = async (m, { conn, args, usedPrefix, command }) => {
  const datas = global
  const idioma = datas.db?.data?.users?.[m.sender]?.language || global.defaultLenguaje || 'es'

  let _translate = {}
  try {
    _translate = JSON.parse(fs.readFileSync(`./src/languages/${idioma}.json`))
  } catch {
    _translate = { plugins: { random_navidad: { texto1: '🎄 Sombras festivas: ¡Feliz Navidad!' } } }
  }
  const tradutor = _translate.plugins.random_navidad

  // Descargar lista de imágenes navideñas
  const res = (await axios.get(`https://raw.githubusercontent.com/BrunoSobrino/TheMystic-Bot-MD/master/src/JSON/navidad.json`)).data
  const mystic = res[Math.floor(res.length * Math.random())]

  // Caption estilo Shadow navideño
  const caption = `
┏━━━━━━━━━━━━━━━━━━━┓
🌑🎄 *SOMBRAS NAVIDEÑAS* 🎄🌑
┗━━━━━━━━━━━━━━━━━━━┛

✨ La oscuridad se viste de luces festivas...
🎵 Entre villancicos y sombras, la navidad revela su misterio.

${tradutor.texto1}
`.trim()

  await conn.sendMessage(m.chat, {
    image: { url: mystic },
    caption: caption,
  }, { quoted: m })
}

handler.help = ['navidad']
handler.tags = ['internet']
// 👇 Usa array en vez de regex para que el loader lo registre seguro
handler.command = ['navidad']

export default handler
