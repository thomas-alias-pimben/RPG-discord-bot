const { SlashCommandBuilder } = require("discord.js");
const config = require("../../config.json");
const getURLTenor = require("../../utils/ManipuleTenor");

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
    if (config.TenorKey) {
      console.log(getURLTenor("hug", "3"));
    }
    await interaction.reply(interaction.options.getSubcommand());
  },
};
