const { SlashCommandBuilder } = require("@discordjs/builders");
const config = require("../../config.json");
const { ChannelType } = require('discord.js');
const { MessageFlags } = require('discord.js');

const {
  afficherPlusieursPartie,
} = require("../../utils/manipulerjson");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("info")
    .setDescription("Get info about a user or a server!")
    .addSubcommand((subcommand) =>
      subcommand
        .setName("user")
        .setDescription("Info about a user")
        .addUserOption((option) =>
          option.setName("target").setDescription("The user").setRequired(true),
        ),
    )
    .addSubcommand((subcommand) =>
      subcommand.setName("server").setDescription("Info about the server"),
    ),
  async execute(interaction) {
   
   
    if(interaction.options.getSubcommand() === "server")
    {
      
      text = "nom:"+interaction.guild.name+"\n"
      text +="les channels\n"

      i=1
      //savoir si le channel est public
       interaction.guild.channels.cache.forEach(channel => {
        const everyoneRole = channel.guild.roles.everyone;
        const canEveryoneView = channel
                                .permissionsFor(everyoneRole)
                                .has('ViewChannel');
        
        
        if (canEveryoneView && channel.type !== ChannelType.GuildCategory)
        {
          text += "\n\tchannel " + i +" : "+channel.name+"\n"
          text += "\t\tid:"+ channel.id+"\n"
          text += "\t\ttype:"+ ChannelType[channel.type]+"\n"
          
         i++
        }
      });
      
      
     
      
      
      partie = afficherPlusieursPartie(text)

      await interaction.reply({
            content: "```" + partie[0] + "```",
            flags: MessageFlags.Ephemeral,
          });
          if (partie.length > 1) {
            partie.shift();
            for (const element of partie) {
              await interaction.followUp({
                content: "```" + element + "```",
                flags: MessageFlags.Ephemeral,
              });
            }
          }
      
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
        if(member.nickname !== null)
        {  
            await interaction.reply("c'est " + member.nickname + " !\npseudo: "+ user.globalName  );
        }
        else
          {
            await interaction.reply("c'est " + user.globalName  );
          }
        }
      
    }
    
  },
};
