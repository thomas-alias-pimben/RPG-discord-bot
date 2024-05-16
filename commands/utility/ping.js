const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("ping")
    .setDescription("ping ... pong LOL"),
  async execute(interaction) {
    await interaction.reply({
      content: "Pong! \n Websocket heartbeat:" + interaction.client.ws.ping+"ms.",
      ephemeral: true,
    }
    );
    console.log(interaction.user.username+" a utilisé ping : Websocket heartbeat:" + interaction.client.ws.ping+"ms.");
  },
};
