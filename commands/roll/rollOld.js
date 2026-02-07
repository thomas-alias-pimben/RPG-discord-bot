const { SlashCommandBuilder } = require("@discordjs/builders");
const {
  valeurAttribut,
  chercheMusiqueVocal,
} = require("../../utils/manipulerjson");
const { jetDe, jetCritique } = require("../../utils/diceFunction");
const { musiquetime } = require("../../utils/vocalFunction");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("rollold")
    .setDescription("que la chance soit avec toi")
    .addStringOption((option) =>
      option
        .setName("attribut")
        .setDescription("l'attribut à utiliser pour ce lancer de dé"),
    ),
  async execute(interaction) {
    const userId = interaction.user.id;
    //les attributs de la fonction
    const attribut = interaction.options.getString("attribut");
    console.log(attribut);
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
      //musiquetime("./musique/echec.mp3", 5000);
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
