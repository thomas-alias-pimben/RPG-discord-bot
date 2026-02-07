const { SlashCommandBuilder } = require("@discordjs/builders");
const { rebootPagePerso } = require("../../utils/channelPersoFunction");
const { adminId } = require("../../config.json");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("rebootpageperso")
    .setDescription("reboot la page des perso"),
  async execute(interaction) {
    const userId = interaction.user.id;
    if (userId === adminId) {
      rebootPagePerso(interaction.client);
      await interaction.reply({
        content: "fini de reset les perso",
        ephemeral: true,
      });
    }
  },
};
