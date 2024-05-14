const { SlashCommandBuilder } = require("discord.js");
const {
  chercheMusiqueVocal,
  getPersoAllAttributs,
  valeurAttributPNJ,
  getPersoAllPNJ,
  getPricipale,
  getAllPNJ,
} = require("../../manipulerjson");
const { jetDe, jetCritique } = require("../../utils/diceFunction");
const { musiquetime } = require("../../utils/vocalFunction");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("roll_pnj")
    .setDescription("pour l'instant c'est une copie de roll")
    .addStringOption((option) =>
      option
        .setName("attribut")
        .setDescription("l'attribut à utiliser pour ce lancer de dé")
        .setAutocomplete(true)
        .setRequired(true),
    )
    .addIntegerOption((option) =>
      option.setName("bonus").setDescription("le bonus"),
    )
    .addStringOption((option) =>
      option
        .setName("pnj")
        .setDescription(
          "le pnj à utiliser, sans cela, c'est le principal qui est choisi",
        )
        .setAutocomplete(true),
    ),
  async autocomplete(interaction) {
    const focusedOption = interaction.options.getFocused(true);
    if (focusedOption.name === "attribut") {
      let idJoueur = interaction.user.id;
      message = interaction.options.data[0].value;
      const focusedValue = interaction.options.getFocused();
      const choices = getPersoAllPNJ(message);
      const filtered = choices.filter((choice) =>
        choice.includes(focusedValue),
      );
      await interaction.respond(
        filtered.map((choice) => ({ name: choice, value: choice })),
      );
    } else {
      message = interaction.options.data[1].value;
      const focusedValue = interaction.options.getFocused();
      const choices = getAllPNJ(message);
      await interaction.respond(
        choices.map((choice) => ({ name: choice, value: choice })),
      );
    }
  },
  async execute(interaction) {
    const userId = interaction.user.id;
    //les attributs de la fonction
    let attribut = interaction.options.getString("attribut");
    let bonus = interaction.options.getInteger("bonus");
    let pnj = interaction.options.getInteger("bonus");

    if (typeof attribut === "string" && attribut[0] === " ") {
      attribut = attribut.slice(1);
    }
    //la valeur de la stat
    const valAttribut = valeurAttributPNJ(attribut, pnj);
    let random = jetDe();
    const randomCritique = jetCritique();
    let message = "";

    //on gere les critique
    if (random === 10) {
      message += "REUSSITE CRITIQUE !!! : **+" + randomCritique + "**\n";
      random += randomCritique;
      musiquetime(chercheMusiqueVocal(userId), 30000);
    }
    if (random === 1) {
      message = "échec critique ... : **-" + randomCritique + "**\n";
      random -= randomCritique;
      musiquetime("./musique/echec.mp3", 5000);
    }
    let res = 0;
    if (valAttribut !== undefined) {
      message += "jet de " + attribut + " : " + random + " + " + valAttribut;

      if (bonus !== null) {
        message += "+ " + bonus;
        random = random + bonus;
      }
      res = random + parseInt(valAttribut);
      message += " = " + res;
    } else {
      res = random;
      message += "jet simple :" + random;
    }
    console.log(message);
    await interaction.reply(
      getPricipale() + " => jet de " + attribut + " : **" + res + "**",
    );
  },
};
