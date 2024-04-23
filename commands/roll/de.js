const { SlashCommandBuilder } = require("discord.js");
const { valeurAttribut, chercheMusiqueVocal } = require("../../manipulerjson");
const { DICE, jetDe } = require("../../diceFunction");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("dé")
    .setDescription("roll a different kind of dice!")
    .addStringOption((option) =>
      option.setName("nb").setDescription("nb de face"),
    ),
  async execute(interaction) {
    //les attributs de la fonction
    const nb = interaction.options.getString("nb");

    //la valeur de la stat
    message = "";
    random = Math.floor(Math.random() * nb + 1);
    if (nb != null) {
      random = Math.floor(Math.random() * nb + 1);
      message += "jet d'un dé " + nb + " : " + random;
    } else {
      random = jetDe();
      message += "jet d'un dé " + DICE + " : " + random;
    }

    await interaction.reply(message);
  },
};
