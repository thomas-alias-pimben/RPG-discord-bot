const { SlashCommandBuilder } = require("@discordjs/builders");
const { affPv } = require("../../utils/manipulerjson");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("voir_pv_ps")
    .setDescription("affiches tes PV et PS"),
  async execute(interaction) {
    //les attributs de la fonction
    userId = interaction.user.id;
    const message = "```" + affPv(userId) + "```";
    await interaction.reply({ content: "" + affPv(userId), ephemeral: true });
  },
};
