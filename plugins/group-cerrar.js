import { delay } from "@whiskeysockets/baileys"

let handler = async (m, { conn, text, args, isAdmin, isBotAdmin }) => {
  if (!m.isGroup) {
    await conn.sendMessage(m.chat, { text: '⚔️ *Este ritual solo puede invocarse en grupos...*' })
    return
  }

  if (!isAdmin) {
    await conn.sendMessage(m.chat, { text: '🌌 *No eres digno de sellar el portal, solo los administradores pueden hacerlo.*' })
    return
  }

  if (!isBotAdmin) {
    await conn.sendMessage(m.chat, { text: '🎭 *Ni siquiera soy administrador... ¿cómo podría cerrar las puertas del reino?*' })
    return
  }

  if (!args[0]) {
    await conn.sendMessage(m.chat, { text: '⏳ *Invoca correctamente el ritual:* !cerrar 10 segundos | !cerrar 5 minutos | !cerrar 1 hora' })
    return
  }

  let tiempoTexto = text.toLowerCase()
  let tiempoMs

  if (tiempoTexto.includes("segundo")) {
    let segundos = parseInt(args[0])
    if (isNaN(segundos) || segundos <= 0) {
      await conn.sendMessage(m.chat, { text: '🕰️ *Las sombras exigen un número válido de segundos.*' })
      return
    }
    tiempoMs = segundos * 1000
  } else if (tiempoTexto.includes("minuto")) {
    let minutos = parseInt(args[0])
    if (isNaN(minutos) || minutos <= 0) {
      await conn.sendMessage(m.chat, { text: '🕰️ *Las sombras exigen un número válido de minutos.*' })
      return
    }
    tiempoMs = minutos * 60 * 1000
  } else if (tiempoTexto.includes("hora")) {
    let horas = parseInt(args[0])
    if (isNaN(horas) || horas <= 0) {
      await conn.sendMessage(m.chat, { text: '🕰️ *Las sombras exigen un número válido de horas.*' })
      return
    }
    tiempoMs = horas * 60 * 60 * 1000
  } else {
    await conn.sendMessage(m.chat, { text: '❄️ *Debes especificar si son segundos, minutos o horas... las sombras no aceptan ambigüedades.*' })
    return
  }

  // Cerrar grupo
  await conn.groupSettingUpdate(m.chat, 'announcement')
  await conn.sendMessage(m.chat, {
    text: `🔒 *El portal ha sido sellado por ${args[0]} ${tiempoTexto.includes("segundo") ? "segundo(s)" : tiempoTexto.includes("minuto") ? "minuto(s)" : "hora(s)"}.*\n\n🌌🎄 *Las sombras vigilan en silencio mientras la Navidad ilumina la oscuridad...*`
  })

  await delay(tiempoMs)

  // Abrir grupo
  await conn.groupSettingUpdate(m.chat, 'not_announcement')
  await conn.sendMessage(m.chat, { text: '✨ *El sello se ha roto... el grupo vuelve a abrirse bajo las luces festivas.* 🎁🌑' })
}

// Registro del comando
handler.help = ['cerrar <número> segundos/minutos/horas']
handler.tags = ['grupo']
handler.command = ['cerrar'] // 👈 array en vez de regex
handler.group = true
handler.admin = true

export default handler
