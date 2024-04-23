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
    .setName("ajouter_pv")
    .setDescription("t'ajoute des PV")
    .addStringOption((option) =>
      option.setName("pv").setDescription("nombre de pv"),
    ),
  async execute(interaction) {
    const userId = interaction.user.id;
    let pv = parseInt(interaction.options.getString("pv"));
    console.log("pv = " + pv);
    if (isNaN(pv)) {
      pv = 0;
    }
    ajouterPv(userId, pv);
    await interaction.reply({ content: "" + affPv(userId), ephemeral: true });
    console.log(
      interaction.user.username +
        " s'ajoute " +
        interaction.options.getString("pv") +
        " pv",
    );
  },
};
