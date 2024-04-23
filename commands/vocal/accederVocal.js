const { SlashCommandBuilder } = require('discord.js');
const {afficherPlusieursPartie , afficherPerso, affAttribut} = require('../../manipulerjson');
const {adminId} = require('../../config.json');
const { joinVoiceChannel } = require('@discordjs/voice');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('accedervocal')
        .setDescription("accede au vocal de l'admin"),
    async execute(interaction) {
        const userId = interaction.user.id;
        if (userId === adminId)
        {
            const voiceChannel = interaction.member.voice.channel;
            if(voiceChannel)
            {
                const { joinVoiceChannel } = require('@discordjs/voice');
                connection = joinVoiceChannel({
                    channelId: voiceChannel.id,
                    guildId: voiceChannel.guild.id,
                    adapterCreator: voiceChannel.guild.voiceAdapterCreator,
                });

                estEnVoc = true
                await interaction.reply({ content:"t'es bien  sur un channel vocal", ephemeral: true });
                //connection.destroy();
            }
            else
            {
                await interaction.reply({ content:"t'es pas sur un channel vocal", ephemeral: true });
            }
        }
        else
        {
            await interaction.reply({ content: "tu n'as pas les droits", ephemeral: true });
            console.log(interaction.user.username+" veut tricher ce petit coquin ###################################") ;
        }
    },
};