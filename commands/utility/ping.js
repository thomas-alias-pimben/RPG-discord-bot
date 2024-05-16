const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("ping")
    .setDescription("ping ... pong LOL"),
  async execute(interaction) {
    await interaction.reply({
      content: "Pong! \n Websocket heartbeat:" + interaction.client.ws.ping,
      ephemeral: true,
    }
    );
    console.log(interaction.user.username+" à utiliser ping : Websocket heartbeat:" + interaction.client.ws.ping);
  },
};
