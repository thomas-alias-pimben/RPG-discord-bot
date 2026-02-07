const { SlashCommandBuilder } = require("@discordjs/builders");
const {
  chercheMusiqueVocal,
  getPersoAllAttributs,
  valeurAttributPNJ,
  getPersoAllPNJ,
  changePNJPrincipale,
  getAllPNJ,
  getPricipale,
} = require("../../utils/manipulerjson");

const { adminId } = require("../../config.json");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("change_pnj")
    .setDescription("commande mj, pour changer de pnj courant ")
    .addStringOption((option) =>
      option
        .setName("pnj")
        .setDescription("le nom du pnj")
        .setAutocomplete(true)
        .setRequired(true),
    ),
  async autocomplete(interaction) {
    let userId = interaction.user.id;
    if (userId === adminId) {
      message = interaction.options.data[0].value;
      const focusedValue = interaction.options.getFocused();
      const choices = getAllPNJ(message);
      const filtered = choices.filter((choice) =>
        choice.includes(focusedValue),
      );
      await interaction.respond(
        filtered.map((choice) => ({ name: choice, value: choice })),
      );
    }
  },
  async execute(interaction) {
    const userId = interaction.user.id;
    //les attributs de la fonction
    let pnj = interaction.options.getString("pnj");
    if (userId === adminId) {
      await interaction.reply(getPricipale() + " => " + pnj);
      changePNJPrincipale(pnj);
    }
  },
};
