const fs = require("node:fs");
const path = require("node:path");
const {
  Client,
  Collection,
  Events,
  GatewayIntentBits,
  IntentsBitField,
} = require("discord.js");

//initialisation du bot discord
const { SlashCommandIntegerOption } = require("@discordjs/builders");

const { token, adminId, guildId } = require("./config.json");

const idAdmin = adminId;

let pageperso = false;
let estEnVoc = false;
require("./registeryCommand");
const { changeURLPNJ } = require("./utils/manipulerjson");
const { joinVoiceChannel } = require("@discordjs/voice");

// Create a new client instance
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildMembers,
    IntentsBitField.Flags.GuildPresences,
    128,
  ],
});

client.commands = new Collection();

const foldersPath = path.join(__dirname, "commands");
const commandFolders = fs.readdirSync(foldersPath);

for (const folder of commandFolders) {
  const commandsPath = path.join(foldersPath, folder);
  const commandFiles = fs
    .readdirSync(commandsPath)
    .filter((file) => file.endsWith(".js"));
  for (const file of commandFiles) {
    const filePath = path.join(commandsPath, file);
    const command = require(filePath);
    // Set a new item in the Collection with the key as the command name and the value as the exported module
    if ("data" in command && "execute" in command) {
      client.commands.set(command.data.name, command);
    } else {
      console.log(
        `[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`,
      );
    }
  }
}

client.on(Events.InteractionCreate, async (interaction) => {
  if (interaction.isChatInputCommand()) {
    const command = interaction.client.commands.get(interaction.commandName);

    if (!command) {
      console.error(
        `No command matching ${interaction.commandName} was found.`,
      );
      return;
    }

    try {
      await command.execute(interaction);
    } catch (error) {
      console.error(error);
      if (interaction.replied || interaction.deferred) {
        await interaction.followUp({
          content: "There was an error while executing this command!",
          ephemeral: true,
        });
      } else {
        await interaction.reply({
          content: "There was an error while executing this command!",
          ephemeral: true,
        });
      }
    }
  } else if (interaction.isAutocomplete()) {
    const command = interaction.client.commands.get(interaction.commandName);

    if (!command) {
      console.error(
        `No command matching ${interaction.commandName} was found.`,
      );
      return;
    }

    try {
      await command.autocomplete(interaction);
    } catch (error) {
      console.error(error);
    }
  }
});

client.once("ready", async (client) => {
  await connecterBotChannelVocal();
  usernameAdmin = client.users.cache.get(idAdmin);
  console.log(`${client.user.tag} connecté`);
  console.log(
    "Je suis prêt pour détruire ton scénario " +
      usernameAdmin.username +
      " °( ^-^)°",
  );
  client.user.setActivity("troller les joueurs");
  changeURLPNJ(client.user.avatarURL());
});

async function connecterBotChannelVocal() {
  const guild = client.guilds.cache.get(guildId);

  if (guild) {
    const voiceChannels = guild.channels.valueOf().filter((channel) => {
      return channel.type === 2;
    });
    voiceChannels.forEach((channel) => {
      let voiceChannel = client.channels.cache.get(channel.id);
      const members = channel.members;

      if (members.some((member) => member.id === idAdmin)) {
        console.log("L'utilisateur est connecté au channel vocal.");
        const { joinVoiceChannel } = require("@discordjs/voice");
        connection = joinVoiceChannel({
          channelId: voiceChannel.id,
          guildId: voiceChannel.guild.id,
          adapterCreator: voiceChannel.guild.voiceAdapterCreator,
        });

        estEnVoc = true;
      }
    });
  } else {
    console.log("Serveur non trouvé.");
  }
}

// Log in to Discord with your client's token
client.login(token);
