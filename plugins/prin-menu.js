import moment from "moment-timezone";
import axios from "axios";
const { prepareWAMessageMedia, generateWAMessageFromContent } = (await import("@whiskeysockets/baileys")).default;

let handler = async (m, { conn, usedPrefix }) => {
  try {
    const isRegistered = global.db.data.users[m.sender]?.registered;
    if (!isRegistered) {
      return conn.sendMessage(m.chat, {
        text: `┏━━━━━━━━━━━━━━━━━━┓\n🎄 *ACCESO DENEGADO* 🎄\n┗━━━━━━━━━━━━━━━━━━┛\n\n🎅 Lo siento, viajero de las sombras...\n✨ Para acceder al menú navideño debes estar registrado.\n\n🔐 Usa *${usedPrefix}reg shadow.18* para unirte al Reino.\n🎁 ¡Las sombras te esperan!`,
        buttons: [{ buttonId: `${usedPrefix}reg shadow.18`, buttonText: { displayText: '✅ Reg Shadow.18' }, type: 1 }],
        headerType: 6
      }, { quoted: m });
    }

    // Construcción del menú dinámico
    let menu = {};
    for (let plugin of Object.values(global.plugins)) {
      if (!plugin || !plugin.help) continue;
      let taglist = plugin.tags || [];
      for (let tag of taglist) {
        if (!menu[tag]) menu[tag] = [];
        menu[tag].push(plugin);
      }
    }

    let uptimeSec = process.uptime();
    let uptimeStr = `${Math.floor(uptimeSec / 3600)}h ${Math.floor((uptimeSec % 3600) / 60)}m ${Math.floor(uptimeSec % 60)}s`;

    let botNameToShow = global.botname || "Shadow 🎄";
    let videoUrl = "https://files.catbox.moe/2gczk3.mp4"; 

    const tz = "America/Tegucigalpa";
    const now = moment.tz(tz);
    const hour = now.hour();
    const timeStr = now.format("HH:mm:ss");

    let saludoNavideño = "🌟 *¡Feliz Día de Sombra!* 🌟";
    if (hour >= 12 && hour < 18) saludoNavideño = "🎁 *¡Tarde de Regalos!* 🎁";
    else if (hour >= 18 || hour < 5) saludoNavideño = "🕯️ *¡Noche de Luces!* 🕯️";

    const tagUser = '@' + m.sender.split('@')[0];
    const separador = '—————————————';

    let txt = `
╔═══════ 🎄 ═══════╗
   *M E N Ú D E L A S S O M B R A S*
╚═══════ ❄️ ═══════╝

${saludoNavideño} ${tagUser}

${separador}

*★ D A T O S - B O T*
• *Nombre:* ${botNameToShow}
• *Estado:* ${(conn.user.jid == global.conn.user.jid ? 'Principal 🅥' : 'Sub-Bot 🅑')}
• *Uptime:* ${uptimeStr}
• *Hora (TGU):* ${timeStr}

${separador}

*★ M E N U - C O M A N D O S*
`;

    const iconos = {
      'main': '🏠', 'menu': '📜', 'rg': '📝', 'rpg': '⚔️', 'econ': '💰', 'group': '👥',
      'tools': '🔧', 'admin': '👑', 'owner': '🌟', 'fun': '🎈', 'sticker': '🖼️',
      'downloader': '📥', 'internet': '📡', 'audio': '🎧', 'nsfw': '🔞', 'xp': '✨'
    };

    for (let tag in menu) {
      const tagTitle = iconos[tag] ? `${iconos[tag]} ${tag.toUpperCase()} ${iconos[tag]}` : tag.toUpperCase();
      txt += `\n*• ${tagTitle}*`;
      let commands = menu[tag].map(plugin => {
        const cmdList = Array.isArray(plugin.help) ? plugin.help : [plugin.help];
        return cmdList.map(cmd => `   - ${usedPrefix}${cmd}`).join('\n');
      }).join('\n');
      txt += `\n${commands}\n`;
    }

    txt += `\n${separador}\n*Creado por Yosue ❤️*`;

    await conn.sendMessage(m.chat, { react: { text: '☃️', key: m.key } });

    let mediaMessage = await prepareWAMessageMedia(
      { video: { url: videoUrl }, gifPlayback: true },
      { upload: conn.waUploadToServer }
    );

    const nativeFlowPayload = {
      buttons: [
        {
          name: "single_select",
          buttonParamsJson: JSON.stringify({
            title: "𝚂𝚎𝚕𝚎𝚌𝚝 𝙼𝚎𝚗𝚞",
            sections: [{
              title: "Shadow-Ai 🌴",
              highlight_label: "🎄",
              rows: [
                { title: "📊 Status", description: "Estado actual del bot", id: `${usedPrefix}status` },
                { title: "🚀 Ping", description: "Velocidad de respuesta", id: `${usedPrefix}ping` },
                { title: "👤 Creador", description: "Contacto de Yosue", id: `${usedPrefix}creador` }
              ]
            }]
          })
        },
        {
          name: "cta_url",
          buttonParamsJson: JSON.stringify({
            display_text: "Canal de WhatsApp",
            url: "https://whatsapp.com/channel/0029VbArz9fAO7RGy2915k3O"
          })
        }
      ],
      messageParamsJson: JSON.stringify({
        bottom_sheet: { button_title: "🌲 Menu lista" }
      })
    };

    const msg = generateWAMessageFromContent(m.chat, {
      viewOnceMessage: {
        message: {
          interactiveMessage: {
            body: { text: txt },
            footer: { text: "Shadow-Ai • By Yosue ❤️" },
            header: {
              hasMediaAttachment: true,
              videoMessage: mediaMessage.videoMessage
            },
            nativeFlowMessage: nativeFlowPayload,
            contextInfo: {
              mentionedJid: [m.sender]
            }
          }
        }
      }
    }, { quoted: m });

    await conn.relayMessage(m.chat, msg.message, {});

  } catch (e) {
    console.error(e);
    conn.reply(m.chat, "❌ Error al generar el menú.", m);
  }
};

 
handler.command = ['menu'];  
export default handler;
