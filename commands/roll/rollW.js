const { SlashCommandBuilder } = require("@discordjs/builders");
const {
  valeurAttribut,
  chercheMusiqueVocal,
  avoirKey,
  cherchePerso,
  getAllWeapons,
  avoirGIF,
  getRandomGIF,
  valeurAttributArme,
} = require("../../utils/manipulerjson");
const { jetDe, jetCritique } = require("../../utils/diceFunction");
const { musiquetime } = require("../../utils/vocalFunction");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("roll_w")
    .setDescription("que la WAAAG soit avec toi")
    .addStringOption((option) =>
      option
        .setName("arme")
        .setDescription("l'arme à utiliser pour ce lancer de dé")
        .setAutocomplete(true)
        .setRequired(true),
    )
    .addIntegerOption((option) =>
      option.setName("rollbonus").setDescription("le les dés bonus"),
    )
    .addIntegerOption((option) =>
      option.setName("bonus").setDescription("le bonus"),
    ),
  async autocomplete(interaction) {
    let idJoueur = interaction.user.id;
    let message = interaction.options.data[0].value;
    const focusedValue = interaction.options.getFocused();
    const choices = getAllWeapons(message);
    const filtered = choices.filter((choice) => choice.includes(focusedValue));
    await interaction.respond(
      filtered.map((choice) => ({ name: choice, value: choice })),
    );
  },
  async execute(interaction) {
    const userId = interaction.user.id;
    //les attributs de la fonction
    let attribut = interaction.options.getString("arme");
    let bonus = interaction.options.getInteger("bonus");
    let deBonus = interaction.options.getInteger("rollbonus");
    let pointbonus = 0;
  
  
    if (typeof attribut === "string" && attribut[0] === " ") {
      attribut = attribut.slice(1);
    }
     
    //la valeur de la stat
    const valAttribut = valeurAttributArme(userId, attribut);
    let random = jetDe();
    const randomCritique = jetCritique();
    let message = "";

    //le dé bonus
    if (deBonus !== null) {
      pointbonus = Math.floor(Math.random() * deBonus + 1);
    }

    critique = 0;
    //on gere les critique
    if (random === 10) {
      critique = 1;
      message += "REUSSITE CRITIQUE !!! : **+" + randomCritique + "**\n";
      random += randomCritique;
      musiquetime(chercheMusiqueVocal(userId), 20000);
    }
    if (random === 1) {
      critique = -1;
      message = "échec critique ... : **-" + randomCritique + "**\n";
      random -= randomCritique;
      musiquetime("./musique/echec.mp3", 5000);
    }
    if (valAttribut !== undefined) {
      message += "jet de " + attribut + " : **" + random + "** +" + valAttribut;

      if (deBonus !== null) {
        1;
        message += "+ __" + pointbonus + "__";
        random += pointbonus;
      }

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
      urlGif = getRandomGIF(critique, attribut);

      if (gif !== NOGIF) {
        await interaction.channel.send(urlGif);
      }
    }
  },
};

NOGIF = "NOGIF";
