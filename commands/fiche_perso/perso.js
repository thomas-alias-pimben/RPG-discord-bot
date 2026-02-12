const { SlashCommandBuilder } = require("@discordjs/builders");
const {
  afficherPlusieursPartie,
  afficherPerso,
} = require("../../utils/manipulerjson");

const { MessageFlags } = require('discord.js');

const { adminId } = require("../../config.json");


module.exports = {
  data: new SlashCommandBuilder()
    .setName("perso")
    .setDescription("affiche ton perso").addUserOption((option) =>
          option.setName("user").setDescription("l'utilisateur"),
        ),
  async execute(interaction) {
    userId = "";
    admin=false
    
    if(interaction.options.getUser("user") === null )
    {
      userId = interaction.user.id;
    }
    else
    {
      
        userId = interaction.options.getUser("user").id;
        admin=true;
        
    }

    const perso = afficherPerso(userId);

    if (admin && interaction.user.id !== adminId) {
       await interaction.reply({
      content: "MON PETIT!! TU N'EST PAS ADMIN",
      flags: MessageFlags.Ephemeral,
    });
      } else {
         
        const persoTab = afficherPlusieursPartie(perso);
    await interaction.reply({
      content: "```" + persoTab[0] + "```",
      flags: MessageFlags.Ephemeral,
    });
    if (persoTab.length > 1) {
      persoTab.shift();
      for (const element of persoTab) {
        await interaction.followUp({
          content: "```" + element + "```",
          flags: MessageFlags.Ephemeral,
        });
      }
    }
    console.log(interaction.user.username + " regarde son perso...");
      }

    
  },
};
