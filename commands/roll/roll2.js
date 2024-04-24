const { SlashCommandBuilder } = require("discord.js");
const {
  valeurAttribut,
  chercheMusiqueVocal,
  avoirKey,
  cherchePerso,
  getPersoAllAttributs,
} = require("../../manipulerjson");
const { jetDe, jetCritique } = require("../../diceFunction");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("roll2")
    .setDescription("Search discordjs.guide!")
    .addStringOption((option) =>
      option
        .setName("attribut")
        .setDescription("Phrase to search for")
        .setAutocomplete(true),
    ),
  async autocomplete(interaction) {
    let idJoueur = interaction.user.id;
    message = interaction.options.data[0].value;
    const focusedValue = interaction.options.getFocused();
    const choices = getPersoAllAttributs(idJoueur, message);
    const filtered = choices.filter((choice) =>
      choice.startsWith(focusedValue),
    );
    await interaction.respond(
      filtered.map((choice) => ({ name: choice, value: choice })),
    );
  },
  async execute(interaction) {
    const userId = interaction.user.id;
    //les attributs de la fonction
    let attribut = interaction.options.getString("attribut");
    if (typeof attribut === "string" && attribut[0] === " ") {
      attribut = attribut.slice(1);
    }
    //la valeur de la stat
    const valAttribut = valeurAttribut(userId, attribut);
    let random = jetDe();
    const randomCritique = jetCritique();
    let message = "";

    //on gere les critique
    if (random === 10) {
      message += "REUSSITE CRITIQUE !!! : **+" + randomCritique + "**\n";
      random += randomCritique;
      ("&");
      //musiquetime(chercheMusiqueVocal(userId), 30000);
    }
    if (random === 1) {
      message = "échec critique ... : **-" + randomCritique + "**\n";
      random -= randomCritique;
      //musiquetime("./musique/echec.mp3",5000);
    }
    if (valAttribut !== undefined) {
      message +=
        "jet de " +
        attribut +
        " : " +
        random +
        "+" +
        valAttribut +
        "=**" +
        (random + valAttribut) +
        "**";
    } else {
      message += "jet simple :**" + random + "**";
    }

    await interaction.reply(message);
  },
};
