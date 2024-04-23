const { SlashCommandBuilder } = require("discord.js");
const { affPv, ajouterPs, modifierPs } = require("../../manipulerjson");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("modifier_ps")
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
    await interaction.reply({ content: "" + affPv(userId), ephemeral: true });
    console.log(interaction.user.username + " s'enleve " + ps + " ps");
  },
};
