const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("ping")
    .setDescription("ping ... pong LOL"),
  async execute(interaction) {
    await interaction.reply(
      "Pong! \n Websocket heartbeat:" + interaction.client.ws.ping,
    );
  },
};
