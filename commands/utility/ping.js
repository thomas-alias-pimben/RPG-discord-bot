const { SlashCommandBuilder } = require('discord.js')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('ping')
        .setDescription('ping ... pong LOL'),
    async execute(interaction) {
        const sent = await interaction.reply({
            content:
                '🏓Pong! \n Websocket heartbeat:' +
                interaction.client.ws.ping +
                'ms.',
            ephemeral: true,
            fetchReply: true,
        })
        await interaction.editReply(
            `🏓Pong! \n Websocket heartbeat: ${interaction.client.ws.ping} ms.\nRoundtrip latency: ${sent.createdTimestamp - interaction.createdTimestamp}ms`
        )
        console.log(
            ` ${interaction.user.username} a utilisé ping : Websocket heartbeat: ${interaction.client.ws.ping} ms. \n Roundtrip latency: ${sent.createdTimestamp - interaction.createdTimestamp}ms`
        )
    },
}
