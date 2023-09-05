const chalk = require('chalk')
const { EmbedBuilder } = require('discord.js')
module.exports = (client, id, replayedEvents) => {
    console.log(`${String(new Date).split(" ", 5).join(" ")}`)
    console.log(`Shard #${id} resumed successfully.`)
    console.log(replayedEvents)
}

