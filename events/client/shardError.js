const EmbedBuilder = require(`discord.js`)
module.exports = (client, error, id) => {
    console.log(`${String(new Date).split(" ", 5).join(" ")}`)
    console.log(`Shard #${id}'s WebSocket encountered a connection error while communicating with the client`)
    console.log(error)
}

