const chalk = require('chalk')
const { EmbedBuilder } = require('discord.js')
module.exports = (client, id) => {
    console.log(`${String(new Date).split(" ", 5).join(" ")}`)
    console.log(`Shard #${id} is attempting to reconnect or re-identify the client.`)
}

