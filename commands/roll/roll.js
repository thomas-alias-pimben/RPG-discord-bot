const { SlashCommandBuilder } = require("discord.js");
const {
  valeurAttribut,
  chercheMusiqueVocal,
  avoirKey,
  cherchePerso,
  getPersoAllAttributs,
  avoirGIF,
  getRandomGIF,
  completeStat,
} = require("../../utils/manipulerjson");
const { jetDe, jetCritique } = require("../../utils/diceFunction");
const { musiquetime } = require("../../utils/vocalFunction");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("roll")
    .setDescription("que la chance soit avec toi")
    .addStringOption((option) =>
      option
        .setName("attribut")
        .setDescription("l'attribut à utiliser pour ce lancer de dé")
        .setAutocomplete(true)
        .setRequired(true),
    )
    .addIntegerOption((option) =>
      option.setName("bonus").setDescription("le bonus"),
    ),
  async autocomplete(interaction) {
    let idJoueur = interaction.user.id;
    let message = interaction.options.data[0].value;
    const focusedValue = interaction.options.getFocused();
    const choices = getPersoAllAttributs(idJoueur, message);
    const filtered = choices.filter((choice) => choice.includes(focusedValue));
    await interaction.respond(
      filtered.map((choice) => ({ name: choice, value: choice })),
    );
  },
  async execute(interaction) {
    const userId = interaction.user.id;
    //les attributs de la fonction
    let attribut = interaction.options.getString("attribut");
    let bonus = interaction.options.getInteger("bonus");
    if (typeof attribut === "string" && attribut[0] === " ") {
      attribut = attribut.slice(1);
    }
    //la valeur de la stat
    const valAttribut = valeurAttribut(userId, attribut);
    let random = jetDe();
    const randomCritique = jetCritique();
    let message = "";

    completeStat(userId, random, randomCritique, valAttribut);

    critique = 0;
    //on gere les critique
    if (random === 10) {
      critique = 1;
      message += "REUSSITE CRITIQUE !!! : **+" + randomCritique + "**\n";
      random += randomCritique;
      musiquetime(chercheMusiqueVocal(userId), 30000);
    }
    if (random === 1) {
      critique = -1;
      message = "échec critique ... : **-" + randomCritique + "**\n";
      random -= randomCritique;
      musiquetime("./musique/echec.mp3", 5000);
    }
    if (valAttribut !== undefined) {
      message += "jet de " + attribut + " : **" + random + "** +" + valAttribut;

      if (bonus !== null) {
        message += "+ " + bonus;
        random = random + bonus;
      }

      message += "=__**" + (random + valAttribut) + "**__";
    } else {
      message += "jet simple :**" + random + "**";
    }

    await interaction.reply(message);
    if (critique !== 0) {
      await interaction.channel.send(getRandomGIF(critique, attribut));
    }
  },
};
