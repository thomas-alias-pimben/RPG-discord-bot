const { SlashCommandBuilder } = require("@discordjs/builders");
const { affPv } = require("../../utils/manipulerjson");
const { MessageFlags } = require('discord.js');

const { adminId } = require("../../config.json");


module.exports = {
  data: new SlashCommandBuilder()
    .setName("voir_pv_ps")
    .setDescription("affiches tes PV et PS").addUserOption((option) =>
          option.setName("user").setDescription("l'utilisateur"),
        ),
  async execute(interaction) {
    //les attributs de la fonction
    userId = interaction.user.id;
    admin=false



    if(interaction.options.getUser("user") !== null )
    {
      userId = interaction.options.getUser("user").id;
      admin=true;
    }

    if (admin && interaction.user.id !== adminId) {
       await interaction.reply({
      content: "MON PETIT!! TU N'EST PAS ADMIN",
      flags: MessageFlags.Ephemeral,
    });
      } else {

    const message = "```" + affPv(userId) + "```";
    await interaction.reply({ content: "" + affPv(userId), flags: MessageFlags.Ephemeral });
      }
  },
};
