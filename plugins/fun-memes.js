import axios from 'axios';

const handler = async (m, { command, conn }) => {
  try {
    const res = await axios.get('https://meme-api.com/gimme');
    const memeUrl = res.data.url;

    if (!memeUrl) throw 'No se encontró meme';

    // Reacciona al mensaje con fuego
    await conn.sendMessage(m.chat, { react: { text: '🔥', key: m.key } });

    // Envía el meme con botón interactivo
    await conn.sendMessage(m.chat, {
      image: { url: memeUrl },
      caption: '🧠 Aquí tienes un meme desde las sombras...',
      footer: '¿Quieres otro?',
      buttons: [
        { buttonId: '.meme', buttonText: { displayText: 'Siguiente meme 🔁' }, type: 1 }
      ],
      headerType: 4
    }, { quoted: m });

  } catch (e) {
    m.reply('⚠️ Las sombras no pudieron encontrar un meme...');
    console.error(e);
  }
};

handler.command = handler.help = ['meme'];
handler.tags = ['diversión', 'humor'];
export default handler;
