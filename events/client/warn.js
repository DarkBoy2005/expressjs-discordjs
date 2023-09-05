const chalk = require('chalk')
const { EmbedBuilder } = require('discord.js')
module.exports = (client, error) => {
	console.log(`${String(new Date).split(" ", 5).join(" ")}`)
	console.log(`The client encountered a warning.`)
	console.log(error)
}
