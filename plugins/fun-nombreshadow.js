function handler(m, { text }) {
  const emoji = "🌑🎄"

  if (!text) return conn.reply(m.chat, `${emoji} *Invoca tu nombre al Jardín de las Sombras.*\nUsa el comando junto a tu nombre para recibir tu identidad secreta...`, m)

  conn.reply(m.chat, `${emoji} *Las sombras navideñas están tejiendo tu destino...* 🎁❄️`, m)

  let teks = text ? text : m.quoted && m.quoted.text ? m.quoted.text : m.text

  // Diccionario Shadow Garden estilo ninja + navidad
  const diccionario = {
    'a': 'ka',
    'b': 'tsu',
    'c': 'mi',
    'd': 'te',
    'e': 'ku',
    'f': 'hi',
    'g': 'ji',
    'h': 'ri',
    'i': 'ki',
    'j': 'zu',
    'k': 'me',
    'l': 'ta',
    'm': 'rin',
    'n': 'to',
    'o': 'mo',
    'p': 'no',
    'q': 'ke',
    'r': 'shi',
    's': 'ari',
    't': 'chi',
    'u': 'do',
    'v': 'ru',
    'w': 'mei',
    'x': 'na',
    'y': 'fu',
    'z': 'mori'
  }

  let nombreShadow = teks.replace(/[a-z]/gi, v => diccionario[v.toLowerCase()] || v)

  m.reply(
`🎭❄️ *Nombre invocado:* ${text}
🌌🎄 *Tu identidad en el Shadow Garden:* ${nombreShadow}

🕯️✨ *Las sombras festivas te han otorgado tu título secreto...*`
  )
}

handler.help = ['nombreshadow *<texto>*']
handler.tags = ['fun', 'shadow', 'navidad']
handler.command = ['nombreshadow', 'nombreninja', 'shadowgarden']

export default handler
