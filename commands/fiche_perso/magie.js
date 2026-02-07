const { SlashCommandBuilder } = require("@discordjs/builders");
const {
  afficherPlusieursPartie,
  afficherPerso,
  affAttribut,
  affSocial,
} = require("../../utils/manipulerjson");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("magie")
    .setDescription("affiche ton perso"),
  async execute(interaction) {
    const userId = interaction.user.id;
    const perso = affSocial(userId);
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
    console.log(interaction.user.username + " regarde ses compétences...");
  },
};
