const { SlashCommandBuilder } = require("@discordjs/builders");
const { affPv, ajouterPs, modifierPs } = require("../../utils/manipulerjson");
const { rebootPagePerso } = require("../../utils/channelPersoFunction");
const { MessageFlags } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName("mj_modifier_ps")
    .setDescription("modifie tes PS ")
    .addStringOption((option) =>
      option.setName("ps").setDescription("nombre de ps"),
    ),
  async execute(interaction) {
    userId = interaction.user.id;
    ps = parseInt(interaction.options.getString("ps"));
    console.log("ps = " + ps);
    if (isNaN(ps)) {
      ps = 0;
    }
    modifierPs(userId, ps);
    rebootPagePerso(interaction.client);
    await interaction.reply({ content: "" + affPv(userId), flags: MessageFlags.Ephemeral });
    console.log(interaction.user.username + " s'enleve " + ps + " ps");
  },
};
