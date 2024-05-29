const { SlashCommandBuilder } = require("discord.js");
const config = require('../../config.json');

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

    const Tenor = require("tenorjs").client({
      "Key": config.TenorKey, // https://developers.google.com/tenor/guides/quickstart
      "Filter": "off", // "off", "low", "medium", "high", not case sensitive
      "Locale": "en_US", // Your locale here, case-sensitivity depends on input
      "MediaFilter": "minimal", // either minimal or basic, not case sensitive
      "DateFormat": "D/MM/YYYY - H:mm:ss A" // Change this accordingly
    });
    Tenor.Search.Query("hug", "3").then(Results => {
      Results.forEach(Post => {
        console.log(`Item #${Post.id} (Created: ${Post.created}) @ ${Post.url}`);
      });
    }).catch(console.error);

    await interaction.reply(interaction.options.getSubcommand());
  },
};
