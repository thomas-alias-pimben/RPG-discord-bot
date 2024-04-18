const { SlashCommandBuilder } = require('discord.js');
const {valeurAttribut, chercheMusiqueVocal,  } = require('../../manipulerjson');
const { jetDe, jetCritique} = require("../../diceFunction")

module.exports = {
    data: new SlashCommandBuilder()
        .setName('roll')
        .setDescription('roll a dice !!')
        .addStringOption(option => option.setName('attribut').setDescription('l\'attribut à utiliser pour ce lancer de dé')),
    async execute(interaction) {
        const userId = interaction.user.id;
        //les attributs de la fonction
        const attribut = interaction.options.getString("attribut");
        console.log(attribut);
        //la valeur de la stat
        const valAttribut = valeurAttribut(userId, attribut) ;
        let random = 			jetDe();
        const randomCritique =	jetCritique();
        let message = "";

        //on gere les critique
        if (random === 10) {
            message += "REUSSITE CRITIQUE !!! : **+" + randomCritique + "**\n";
            random += randomCritique;
            '&'
            musiquetime(chercheMusiqueVocal(userId), 30000);
        }
        if (random === 1)
        {
            message = "échec critique ... : **-"+randomCritique+"**\n";
            random -= randomCritique;
            //musiquetime("./musique/echec.mp3",5000);
        }
        if (attribut != null)
        {
            message += "jet de "+attribut+" : "+random+"+"+valAttribut +"=**"+(random +valAttribut)+"**";
        }
        else
        {
            message += "jet simple :**"+random+"**";
        }

        await interaction.reply(message);
    },
};