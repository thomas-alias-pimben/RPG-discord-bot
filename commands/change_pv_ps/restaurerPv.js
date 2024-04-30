const { SlashCommandBuilder } = require("discord.js");
const {
  valeurAttribut,
  chercheMusiqueVocal,
  affPv,
  ajouterPv,
  restaurerPv,
} = require("../../manipulerjson");
const { DICE, jetDe } = require("../../utils/diceFunction");
const { rebootPagePerso } = require("../../utils/channelPersoFunction");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("restaurer_pv")
    .setDescription("restaure tes PV"),
  async execute(interaction) {
    userId = interaction.user.id;
    restaurerPv(userId);
    rebootPagePerso(interaction.client);
    await interaction.reply({ content: "" + affPv(userId), ephemeral: true });
    console.log(interaction.user.username + " restaure ses pv");
  },
};
