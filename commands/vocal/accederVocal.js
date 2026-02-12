const { SlashCommandBuilder } = require("@discordjs/builders");
const {
  joinVoiceChannel,
  createAudioPlayer,
  createAudioResource,
  NoSubscriberBehavior,
} = require("@discordjs/voice");
const path = require("path");
const fs = require("fs");
const { adminId } = require("../../config.json");
const { MessageFlags } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName("accedervocal")
    .setDescription("Accède au vocal de l'admin et peut jouer un son RPG")
    .addStringOption((option) =>
      option
        .setName("son")
        .setDescription("Nom du son à jouer (ex: attack)")
        .setRequired(false),
    ),

  async execute(interaction) {
    const userId = interaction.user.id;
    if (userId !== adminId) {
      await interaction.reply({
        content: "Tu n'as pas les droits",
        flags: MessageFlags.Ephemeral,
      });
      console.log(
        `${interaction.user.username} a essayé d'accéder au vocal sans droit !`,
      );
      return;
    }

    const voiceChannel = interaction.member.voice.channel;
    if (!voiceChannel) {
      await interaction.reply({
        content: "Tu n'es pas sur un channel vocal",
        flags: MessageFlags.Ephemeral,
      });
      return;
    }

    // Connexion au canal vocal
    const connection = joinVoiceChannel({
      channelId: voiceChannel.id,
      guildId: voiceChannel.guild.id,
      adapterCreator: voiceChannel.guild.voiceAdapterCreator,
      selfDeaf: false,
    });

    // Création d'un audio player
    const player = createAudioPlayer({
      behaviors: { noSubscriber: NoSubscriberBehavior.Play },
    });
    connection.subscribe(player);

    connection.on("error", (error) =>
      console.error("Erreur connection:", error),
    );
    player.on("error", (error) => console.error("Erreur player:", error));

    // Jouer un son si fourni
    const soundName = interaction.options.getString("son");
    if (soundName) {
      const filePath = path.join(
        __dirname,
        "../../musique/",
        `${soundName}.mp3`,
      );
      if (!fs.existsSync(filePath)) {
        await interaction.reply({
          content: `Le son '${soundName}' est introuvable !`,
          flags: MessageFlags.Ephemeral,
        });
        return;
      }

      const resource = createAudioResource(filePath);
      player.play(resource);
    }

    await interaction.reply({
      content: "Tu es bien sur le channel vocal",
      flags: MessageFlags.Ephemeral,
    });
  },
};
