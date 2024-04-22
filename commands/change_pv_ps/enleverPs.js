const { SlashCommandBuilder } = require('discord.js');
const { affPv, ajouterPs,  } = require('../../manipulerjson');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('enlever_ps')
        .setDescription("t'enleve des PS ")
        .addStringOption(option => option.setName('ps').setDescription('nombre de ps')),
    async execute(interaction) {
        userId = interaction.user.id;
        ps = parseInt(interaction.options.getString("ps"));
        console.log("ps = "+ps);
        if (isNaN(ps))
        {
            ps=0;
        }
        ajouterPs(userId,-1*ps);
        await interaction.reply({ content: "" + affPv(userId), ephemeral: true });
        console.log(interaction.user.username+" s'enleve "+ps+" ps") ;
    },
};