const { SlashCommandBuilder } = require("@discordjs/builders");
const config = require("../../config.json");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("info")
    .setDescription("Get info about a user or a server!")
    .addSubcommand((subcommand) =>
      subcommand
        .setName("user")
        .setDescription("Info about a user")
        .addUserOption((option) =>
          option.setName("target").setDescription("The user"),
        ),
    )
    .addSubcommand((subcommand) =>
      subcommand.setName("server").setDescription("Info about the server"),
    ),
  async execute(interaction) {
    
    await interaction.reply(interaction.options.getSubcommand());
  },
};
