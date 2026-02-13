const { SlashCommandBuilder } = require("@discordjs/builders");
const {
  valeurAttribut,
  chercheMusiqueVocal,
  valeurBonus,
  getRandomGIF,
} = require("../../utils/manipulerjson");
const { jetDe, jetCritique } = require("../../utils/diceFunction");
const { adminId } = require("../../config.json");
const { musiquetime } = require("../../utils/vocalFunction");
const { spoilrollMJ } = require("../../config.json");
const { MessageFlags } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName("rollmj")
    .setDescription("commande mj")
    .addIntegerOption((option) =>
      option.setName("nb")
            .setDescription("le numéro du bonus")
            .setRequired(true),
    ).addBooleanOption((option) =>
      option
        .setName("caché")
        .setDescription("est ce que ton roll est caché?")
    ),
  async execute(interaction) {
    userId = interaction.user.id;
    if (userId === adminId) {
      //les attributs de la fonction
      const bonus = interaction.options.getInteger("nb");
      console.log(bonus);

      //cache
      let prive = interaction.options.getBoolean("caché");
      let flag = 0;
      if(prive){
      flag = MessageFlags.Ephemeral
    }

      //la valeur de la stat
      const valAttribut = valeurBonus(bonus);
      let random = jetDe();
      const randomCritique = jetCritique();
      let message = "";
      let critique = 0;
      if (valAttribut !== undefined) {
        //on gere les critique
        if (random === 10) {
          critique = 1;
          random += randomCritique;
          //musiquetime(chercheMusiqueVocal(userId), 50000);
        }
        if (random === 1) {
          critique = -1;
          random -= randomCritique;
          //musiquetime("./musique/echec.mp3", 5000);
        }
        if (bonus != null) {
          console.log(
            "jet de " +
              bonus +
              " : " +
              random +
              "+" +
              valAttribut +
              "= " +
              (random + valAttribut),
          );
          message += "jet : **" + (random + valAttribut) + "**";
        } else {
          message += "jet simple :**" + random + "**";
        }

        await interaction.reply( { content: message, flags: flag });
      } else {
        message += "jet simple :**" + random + "**";
        await interaction.reply({ content: message, flags: flag });
      }
      if (critique !== 0 && (spoilrollMJ ?? false)) {
        await interaction.channel.send(getRandomGIF(critique, "default"));
      }
    } else {
      await interaction.reply({
        content: "tu n'as pas les droits",
        flags: MessageFlags.Ephemeral,
      });
      console.log(
        interaction.user.username +
          " veut tricher ce petit coquin ###################################",
      );
    }
  },
};
