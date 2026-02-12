const { SlashCommandBuilder } = require("@discordjs/builders");
const { affPv, ajouterPs, restaurerPs } = require("../../utils/manipulerjson");
const { rebootPagePerso } = require("../../utils/channelPersoFunction");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("mj_restaurer_ps")
    .setDescription("restaure tes PS "),
  async execute(interaction) {
    userId = interaction.user.id;
    restaurerPs(userId);
    rebootPagePerso(interaction.client);
    await interaction.reply({ content: "" + affPv(userId), ephemeral: true });
    console.log(interaction.user.username + " restaure ses ps");
  },
};
