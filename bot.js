
const { Client, GatewayIntentBits } = require('discord.js');
const { discordToken } = require('./config/config');
const messageController = require('./controllers/messageController');
const connectDB = require("./config/db");
const { createorfetchchannel } = require("./utils/personalchannelmanager");

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildMembers
  ]
});

connectDB();

client.once('ready', async () => {
  console.log(`🤖 Logged in as ${client.user.tag}`);

  try {
    const guild = client.guilds.cache.first();
    const members = await guild.members.fetch();

    for (const member of members.values()) {
      if (!member.user.bot) {
        await createorfetchchannel(member.user, guild);
      }
    }

    console.log("✅ Personal channels created for all users.");
  } catch (error) {
    console.error("❌ Error creating personal channels on startup:", error);
  }
});

client.on('messageCreate', (message) => {
  messageController.messagehandel(message);
});

client.on('guildMemberAdd', async (member) => {
  try {
    const personalChannel = await createorfetchchannel(member.user, member.guild);
    await personalChannel.send(`👋 Welcome <@${member.user.id}>! This is your private AI assistant space. Ask anything using \`/ask\`.`);
    console.log(`✅ Created personal channel for ${member.user.tag}`);
  } catch (err) {
    console.error(`❌ Error creating personal channel:`, err);
  }
});

client.login(discordToken);

