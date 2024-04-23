const { SlashCommandBuilder } = require("discord.js");
const {
  valeurAttribut,
  chercheMusiqueVocal,
  affPv,
  ajouterPv,
} = require("../../manipulerjson");
const { DICE, jetDe } = require("../../diceFunction");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("enlever_pv")
    .setDescription("t'enleve des PV ")
    .addStringOption((option) =>
      option.setName("pv").setDescription("nombre de pv"),
    ),
  async execute(interaction) {
    userId = interaction.user.id;
    pv = parseInt(interaction.options.getString("pv"));
    console.log("pv = " + pv);
    if (isNaN(pv)) {
      pv = 0;
    }
    ajouterPv(userId, -1 * pv);
    await interaction.reply({ content: "" + affPv(userId), ephemeral: true });
    console.log(
      interaction.user.username +
        " s'enleve " +
        interaction.options.getString("pv") +
        " pv",
    );
  },
};
