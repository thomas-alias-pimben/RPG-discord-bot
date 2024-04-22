const { SlashCommandBuilder } = require('discord.js');
const {valeurAttribut, chercheMusiqueVocal, affPv,  } = require('../../manipulerjson');
const {DICE, jetDe} = require("../../diceFunction")

module.exports = {
    data: new SlashCommandBuilder()
        .setName('voir_pv_ps')
        .setDescription('affiches tes PV et PS')
        .addStringOption(option => option.setName('nb').setDescription('nb de face')),
    async execute(interaction) {
        //les attributs de la fonction
        userId = interaction.user.id
        const message =  "```"+affPv(userId)+"```";
        await interaction.reply({ content: "" + affPv(userId), ephemeral: true });
    },
};