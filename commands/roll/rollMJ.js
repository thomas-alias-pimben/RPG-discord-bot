const { SlashCommandBuilder } = require("discord.js");
const {
  valeurAttribut,
  chercheMusiqueVocal,
  valeurBonus, getRandomGIF,
} = require("../../utils/manipulerjson");
const { jetDe, jetCritique } = require("../../utils/diceFunction");
const { adminId } = require("../../config.json");
const { musiquetime } = require("../../utils/vocalFunction");
const { spoilrollMJ } = require("../../config.json");
module.exports = {
  data: new SlashCommandBuilder()
    .setName("rollmj")
    .setDescription("commande mj")
    .addStringOption((option) =>
      option.setName("nb").setDescription("le numéro du bonus"),
    ),
  async execute(interaction) {
    userId = interaction.user.id;
    if (userId === adminId) {
      //les attributs de la fonction
      const bonus = interaction.options.getString("nb");
      console.log(bonus);
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
          musiquetime(chercheMusiqueVocal(userId), 30000);
        }
        if (random === 1) {
          critique = -1;
          random -= randomCritique;
          musiquetime("./musique/echec.mp3", 5000);
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

        await interaction.reply(message);
      } else {
        message += "jet simple :**" + random + "**";
        await interaction.reply(message);
      }
      if (critique !== 0 && (spoilrollMJ ?? false)) {
        await interaction.channel.send(getRandomGIF(critique, "default"));
      }
    } else {
      await interaction.reply({
        content: "tu n'as pas les droits",
        ephemeral: true,
      });
      console.log(
        interaction.user.username +
          " veut tricher ce petit coquin ###################################",
      );
    }
  },
};
