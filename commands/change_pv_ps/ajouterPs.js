const { SlashCommandBuilder } = require("discord.js");
const { affPv, ajouterPs } = require("../../manipulerjson");
const { rebootPagePerso } = require("../../utils/channelPersoFunction");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("ajouter_ps")
    .setDescription("t'ajoute des PS ")
    .addStringOption((option) =>
      option.setName("ps").setDescription("nombre de ps"),
    ),
  async execute(interaction) {
    userId = interaction.user.id;
    ps = parseInt(interaction.options.getString("ps"));
    console.log("ps = " + ps);
    if (isNaN(ps)) {
      ps = 0;
    }
    ajouterPs(userId, ps);
    rebootPagePerso(interaction.client);
    await interaction.reply({ content: "" + affPv(userId), ephemeral: true });
    console.log(interaction.user.username + " s'enleve " + ps + " ps");
  },
};
