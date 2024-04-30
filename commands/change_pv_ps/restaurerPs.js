const { SlashCommandBuilder } = require("discord.js");
const { affPv, ajouterPs, restaurerPs } = require("../../manipulerjson");
const { rebootPagePerso } = require("../../utils/channelPersoFunction");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("restaurer_ps")
    .setDescription("restaure tes PS "),
  async execute(interaction) {
    userId = interaction.user.id;
    restaurerPs(userId);
    rebootPagePerso(interaction.client);
    await interaction.reply({ content: "" + affPv(userId), ephemeral: true });
    console.log(interaction.user.username + " restaure ses ps");
  },
};
