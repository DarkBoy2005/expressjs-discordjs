const { SlashCommandBuilder, EmbedBuilder, Embed } = require("discord.js");

const clean = async (text) => {
  if (text && text.constructor.name == "Promise") text = await text;
  if (typeof text !== "string")
    text = require("util").inspect(text, { depth: 1 });
  text = text
    .replace(/`/g, "`" + String.fromCharCode(8203))
    .replace(/@/g, "@" + String.fromCharCode(8203));
  return text;
};

module.exports = {
  data: new SlashCommandBuilder()
    .setName(`eval`)
    .setDescription(`Evaluate`)
    .addStringOption((option) =>
      option
        .setName("input")
        .setDescription("The input of the evaluation")
        .setRequired(true)
    ),
  async execute(interaction, client) {
    if (interaction.member.id !== process.env.OWNER_ID)
      return interaction.reply({
        content: `Only the owner of the bot can execute this command!`,
        ephemeral: true,
      });
    try {
      const input = interaction.options.getString("input");
      const evaled = eval(input);
      const output = await clean(evaled);
      console.log(output)
      return interaction.reply({
        ephemeral: true,
        embeds: [
          new EmbedBuilder()
            .setTitle(`Evaluation results`)
            .setDescription(`\`\`\`\njs\n${output}\n\`\`\``)
            .setTimestamp(),
        ],
      });
    } catch (e) {
      console.log(e)
      return interaction.reply({
        ephemeral: true,
        embeds: [
          new EmbedBuilder()
            .setTitle(`Internal error:`)
            .setDescription(`\`\`\`${e}\`\`\``),
        ],
      });
    }
  },
};
