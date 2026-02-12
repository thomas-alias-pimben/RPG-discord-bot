const { SlashCommandBuilder } = require("@discordjs/builders");
const { affPv } = require("../../utils/manipulerjson");
const { MessageFlags } = require('discord.js');


module.exports = {
  data: new SlashCommandBuilder()
    .setName("mj_voir_pv_ps")
    .setDescription("affiches tes PV et PS").addUserOption((option) =>
          option.setName("user").setDescription("l'utilisateur"),
        ),
  async execute(interaction) {
    //les attributs de la fonction
    userId = interaction.options.getUser("user").id;
    const message = "```" + affPv(userId) + "```";
    await interaction.reply({ content: "" + affPv(userId), flags: MessageFlags.Ephemeral });
  },
};
