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
    if(interaction.options.getSubcommand() === "server")
    {
      await interaction.reply(interaction.options.getSubcommand());
    }
    if(interaction.options.getSubcommand() === "user")
    {
      
      const user = interaction.options.getUser("target")
      if(user.bot)
      {
        await interaction.reply("c'est " + user.username+ " !\nc'est un bot");
      }
      else
      {
        const member = interaction.guild.members.cache.get(user.id)
        await interaction.reply("c'est " + member.nickname + " !\npseudo: "+ user.globalName  );
      }
      
    }
    
  },
};
