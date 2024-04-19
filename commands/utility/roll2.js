const { SlashCommandBuilder } = require('discord.js');
const {valeurAttribut, chercheMusiqueVocal,  } = require('../../manipulerjson');
const { jetDe, jetCritique} = require("../../diceFunction")


module.exports = {
    data: new SlashCommandBuilder()
        .setName('roll2')
        .setDescription('Search discordjs.guide!')
        .addStringOption(option =>
            option.setName('query')
                .setDescription('Phrase to search for')
                .setAutocomplete(true)),
    async autocomplete(interaction) {
        const focusedValue = interaction.options.getFocused();
        const choices = ['Popular Topics: Threads', 'Sharding: Getting started', 'Library: Voice Connections', 'Interactions: Replying to slash commands', 'Popular Topics: Embed preview'];
        const filtered = choices.filter(choice => choice.startsWith(focusedValue));
        await interaction.respond(
            filtered.map(choice => ({ name: choice, value: choice })),
        );
    },
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

        if (valAttribut !== undefined) {

            //on gere les critique
            if (random === 10) {
                message += "REUSSITE CRITIQUE !!! : **+" + randomCritique + "**\n";
                random += randomCritique;
                '&'
                //musiquetime(chercheMusiqueVocal(userId), 30000);
            }
            if (random === 1) {
                message = "échec critique ... : **-" + randomCritique + "**\n";
                random -= randomCritique;
                //musiquetime("./musique/echec.mp3",5000);
            }
            if (attribut != null) {
                message += "jet de " + attribut + " : " + random + "+" + valAttribut + "=**" + (random + valAttribut) + "**";
            } else {
                message += "jet simple :**" + random + "**";
            }

            await interaction.reply(message);
        }
        else
        {
            message += "jet simple :**" + random + "**";
            await interaction.reply(message);
        }
    },
};