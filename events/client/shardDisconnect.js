const EmbedBuilder = require(`discord.js`)
module.exports = (client, event, id) => {
    console.log(`${String(new Date).split(" ", 5).join(" ")}`)
    console.log(`Shard #${id}'s WebSocket got disconnected from the bot, due to network limitations and will not attempt to reconnect.`)
    console.log(event)
}

