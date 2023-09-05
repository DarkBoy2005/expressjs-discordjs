const {
	SlashCommandBuilder,
	EmbedBuilder,
	PermissionsBitField,
	ActionRowBuilder,
	ButtonBuilder,
	ButtonStyle,
	AttachmentBuilder,
	ModalBuilder,
	TextInputBuilder,
	TextInputStyle,
	ChannelType,
	SelectMenuBuilder,
	InteractionType
} = require("discord.js");
const log = require('log-to-file');
module.exports = async (client, interaction) => {
	if (interaction.isChatInputCommand()) {
		const { commands } = client;
		const { commandName } = interaction;
		const command2 = commands.get(commandName);
		if (!command2) return;
		let temp = []
		interaction.options.data.forEach(data => {
			if(data.type === 1) {
				temp.push(data.name)
				data.options.forEach((option) => {
					temp.push(option.name + `:` + interaction.options.get(option.name).value)
				})
			} else if(data.type === 2) {
				temp.push(data.name)
				data.options.forEach((data2) => {
					if(data2.type=== 1) {
						temp.push(data2.name)
						temp.push(data2.name + `:` + interaction.options.get(data2.name).value)
					}
				})
			} else {
				temp.push(data.name + `:` + interaction.options.get(data.name).value)
			}
		})
		log(`${interaction.guild.name}(${interaction.guildId}): ${interaction.member.user.username}#${interaction.member.user.discriminator}(${interaction.member.id}) => /${temp.join(` `)}`, `./logs/command-logs.log`)
		await command2.execute(interaction, client)
	} else if (interaction.isButton()) {
		const { buttons } = client;
		const { customId } = interaction;
		const button = buttons.get(customId)
		log(`${interaction.guild.name}(${interaction.guildId}): ${interaction.member.user.username}#${interaction.member.user.discriminator}(${interaction.member.id}) => Used "${interaction.customId}" button`, `./logs/buttons-logs.log`)
		if (!button) return new Error(`Internal error: No code for this button ${customId}`)
		await button.execute(interaction, client)
	} else if (interaction.isStringSelectMenu() || interaction.isRoleSelectMenu() || interaction.isChannelSelectMenu() || interaction.isUserSelectMenu() || interaction.isMentionableSelectMenu()) {
		const { selectMenus } = client;
		const { customId } = interaction;
		const menu = selectMenus.get(customId)
		log(`${interaction.guild.name}(${interaction.guildId}): ${interaction.member.user.username}#${interaction.member.user.discriminator}(${interaction.member.id}) => Used "${interaction.customId}" Select Menu, choosed "${interaction.values.join(`, `)}"`, `./logs/selectMenus-logs.log`)
		if (!menu) return new Error(`Internal error: No code for this menu ${customId}`)
		await menu.execute(interaction, client)
	} else if (interaction.type == InteractionType.ModalSubmit) {
		const { modals } = client;
		const { customId } = interaction;
		const modal = modals.get(customId);
		if (!modal) return new Error(`Internal error: No code for this menu ${customId}`);
		await modal.execute(interaction, client)
	} else if (interaction.isContextMenuCommand()) {
		const { commands } = client;
		const { commandName } = interaction;
		const contextCommand = commands.get(commandName);
		log(`${interaction.guild.name}(${interaction.guildId}): ${interaction.member.user.username}#${interaction.member.user.discriminator}(${interaction.member.id}) => Used "${interaction.commandName}" message action`, `./logs/messageAction-logs.log`)
		if (!contextCommand) return;
		await contextCommand.execute(interaction, client)
	} else if (interaction.type = InteractionType.ApplicationCommandAutocomplete) {
		const { commands } = client;
		const { commandName } = interaction;
		const command = commands.get(commandName)
		if (!command) return
		await command.autocomplete(interaction, client)
	}
};
