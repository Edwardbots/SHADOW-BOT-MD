import axios from 'axios';
const {
  generateWAMessageContent,
  generateWAMessageFromContent,
  proto
} = (await import("@whiskeysockets/baileys"))["default"];

let handler = async (m, { conn, text, usedPrefix, command }) => {
  if (!text) {
    return conn.reply(m.chat, `🎄🗡️ *Discípulo de las Sombras*, ingresa lo que deseas invocar desde Pinterest uwu`, m);
  }

  let query = text + " hd";
  await m.react("🗡️");
  conn.reply(m.chat, `❄️✨ *Las Sombras buscan tus imágenes...* espera un momento bajo la nieve 🎅`);

  try {
    let { data } = await axios.get(`https://api.dorratz.com/v2/pinterest?q=${encodeURIComponent(query)}`);
    let images = data.slice(0, 10).map(item => item.image_large_url);
    let cards = [];
    let counter = 1;

    for (let url of images) {
      const { imageMessage } = await generateWAMessageContent({ image: { url } }, { upload: conn.waUploadToServer });
      cards.push({
        body: proto.Message.InteractiveMessage.Body.fromObject({ text: `🕯️ Imagen sombría ${counter++} 🎄` }),
        footer: proto.Message.InteractiveMessage.Footer.fromObject({ text: "🌌 *Las sombras te entregan este regalo* 🎁" }),
        header: proto.Message.InteractiveMessage.Header.fromObject({ title: 'Shadow uwu', hasMediaAttachment: true, imageMessage }),
        nativeFlowMessage: proto.Message.InteractiveMessage.NativeFlowMessage.fromObject({
          buttons: [{
            name: "cta_url",
            buttonParamsJson: JSON.stringify({
              display_text: "🔗 Portal de Pinterest",
              Url: `https://www.pinterest.com/search/pins/?q=${encodeURIComponent(query)}`,
              merchant_url: `https://www.pinterest.com/search/pins/?q=${encodeURIComponent(query)}`
            })
          }]
        })
      });
    }

    const messageContent = generateWAMessageFromContent(m.chat, {
      viewOnceMessage: {
        message: {
          messageContextInfo: { deviceListMetadata: {}, deviceListMetadataVersion: 2 },
          interactiveMessage: proto.Message.InteractiveMessage.fromObject({
            body: proto.Message.InteractiveMessage.Body.create({ text: `📎 *Sombras encontradas para:* ${query} 🎄🗡️` }),
            footer: proto.Message.InteractiveMessage.Footer.create({ text: "❄️ *Imágenes procesadas por el Reino de las Sombras* ✨" }),
            header: proto.Message.InteractiveMessage.Header.create({ hasMediaAttachment: false }),
            carouselMessage: proto.Message.InteractiveMessage.CarouselMessage.fromObject({ cards })
          })
        }
      }
    }, { quoted: m });

    await m.react("🎁");
    await conn.relayMessage(m.chat, messageContent.message, { messageId: messageContent.key.id });
  } catch (error) {
    console.error(error);
    return conn.reply(m.chat, `⛔ *Las Sombras fallaron... inténtalo más tarde bajo la luna* 🌌`, m);
  }
};

handler.help = ["pinterest", "pin"];
handler.tags = ["buscador"];
handler.command = ["pinterest", "pin"];

export default handler;
