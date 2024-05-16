const {
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
  SlashCommandBuilder,
} = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("testbutton")
    .setDescription("test de bouton")
    .addUserOption((option) =>
      option.setName("target").setDescription("test getUser"),
    )
    .addStringOption((option) =>
      option.setName("reason").setDescription("la raison"),
    ),
  async execute(interaction) {
    const target = interaction.options.getUser("target");
    const reason =
      interaction.options.getString("reason") ?? "No reason provided";

    const confirm = new ButtonBuilder()
      .setCustomId("confirm")
      .setLabel("oui")
      .setStyle(ButtonStyle.Danger);

    const cancel = new ButtonBuilder()
      .setCustomId("cancel")
      .setLabel("non")
      .setStyle(ButtonStyle.Secondary);

    const row = new ActionRowBuilder().addComponents(cancel, confirm);

    response = await interaction.reply({
      content: ` a-tu choisi ${target} pour la raison : ${reason}?`,
      components: [row],
    });
    const collectorFilter = (i) => i.user.id === interaction.user.id;
    try {
      const confirmation = await response.awaitMessageComponent({
        filter: collectorFilter,
        time: 60_000,
      });

      if (confirmation.customId === "confirm") {
        await confirmation.update({
          content: `${target.username} à été ban par ce que: ${reason} \n LOL`,
          components: [],
        });
      } else if (confirmation.customId === "cancel") {
        await confirmation.update({
          content: "Action cancelled",
          components: [],
        });
      }
    } catch (e) {
      console.error(e);
      await interaction.editReply({
        content: "Confirmation not received within 1 minute, cancelling",
        components: [],
      });
    }
  },
};
