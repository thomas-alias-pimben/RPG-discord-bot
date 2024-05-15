const { SlashCommandBuilder } = require("discord.js");
const {
  valeurAttribut,
  chercheMusiqueVocal,
  affPv,
  ajouterPv,
} = require("../../utils/manipulerjson");
const { DICE, jetDe } = require("../../utils/diceFunction");
const { rebootPagePerso } = require("../../utils/channelPersoFunction");

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
    rebootPagePerso(interaction.client);
    await interaction.reply({ content: "" + affPv(userId), ephemeral: true });
    console.log(
      interaction.user.username +
        " s'ajoute " +
        interaction.options.getString("pv") +
        " pv",
    );
  },
};
