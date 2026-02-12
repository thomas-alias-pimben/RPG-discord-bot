const { SlashCommandBuilder } = require("@discordjs/builders");
const {
  valeurAttribut,
  chercheMusiqueVocal,
  affPv,
  ajouterPv,
  restaurerPv,
} = require("../../utils/manipulerjson");
const { DICE, jetDe } = require("../../utils/diceFunction");
const { rebootPagePerso } = require("../../utils/channelPersoFunction");
const { MessageFlags } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName("restaurer_pv")
    .setDescription("restaure tes PV"),
  async execute(interaction) {
    userId = interaction.user.id;
    restaurerPv(userId);
    rebootPagePerso(interaction.client);
    await interaction.reply({ content: "" + affPv(userId), flags: MessageFlags.Ephemeral });
    console.log(interaction.user.username + " restaure ses pv");
  },
};
