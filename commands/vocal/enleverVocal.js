const { SlashCommandBuilder } = require('discord.js')
const { adminId } = require('../../config.json')
const { getVoiceConnections } = require('@discordjs/voice')
module.exports = {
    data: new SlashCommandBuilder()
        .setName('enlevervocal')
        .setDescription("le bot se déconnecte du vocal de l'admin"),
    async execute(interaction) {
        const userId = interaction.user.id
        if (userId === adminId) {
            const connection = getVoiceConnections().entries().next().value[1]
            connection.destroy()
            estEnVoc = false
            await interaction.reply({
                content: "ok je m'en vais... :(",
                ephemeral: true,
            })
        }
    },
}
