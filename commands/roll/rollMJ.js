const {SlashCommandBuilder} = require('discord.js');
const {valeurAttribut, chercheMusiqueVocal, valeurBonus,} = require('../../manipulerjson');
const {jetDe, jetCritique} = require("../../diceFunction")

module.exports = {
    data: new SlashCommandBuilder().setName('rollmj').setDescription('commande mj')
        .addStringOption(option => option.setName('nb').setDescription('le numéro du bonus')),
    async execute(interaction) {
        //les attributs de la fonction
        const bonus = interaction.options.getString("nb");
        console.log(bonus);
        //la valeur de la stat
        const valAttribut = valeurBonus(bonus);
        let random = jetDe();
        const randomCritique = jetCritique();
        let message = "";

        if (valAttribut !== undefined) {
            //on gere les critique
            if (random == 10) {

                random += randomCritique;
                //musiquetime(chercheMusiqueVocal(userId),30000);
            }
            if (random == 1) {

                random -= randomCritique;
                musiquetime("./musique/echec.mp3", 5000);
            }
            if (bonus != null) {
                console.log("jet de " + bonus + " : " + random + "+" + valAttribut + "= " + (random + valAttribut))
                message += "jet : **" + (random + valAttribut) + "**";
            } else {
                message += "jet simple :**" + random + "**";
            }

            await interaction.reply(message);
        } else {
            message += "jet simple :**" + random + "**";
            await interaction.reply(message);
        }
    },
};