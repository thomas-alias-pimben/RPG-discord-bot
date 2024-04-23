const { SlashCommandBuilder } = require("discord.js");
const {
  afficherPlusieursPartie,
  afficherPerso,
} = require("../../manipulerjson");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("perso")
    .setDescription("affiche ton perso"),
  async execute(interaction) {
    const userId = interaction.user.id;
    const perso = afficherPerso(userId);

    const persoTab = afficherPlusieursPartie(perso);
    await interaction.reply({
      content: "```" + persoTab[0] + "```",
      ephemeral: true,
    });
    if (persoTab.length > 1) {
      persoTab.shift();
      for (const element of persoTab) {
        await interaction.followUp({
          content: "```" + element + "```",
          ephemeral: true,
        });
      }
    }
    console.log(interaction.user.username + " regarde son perso...");
  },
};
