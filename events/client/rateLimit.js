const EmbedBuilder = require(`discord.js`)
module.exports = (client, rateLimitData) => {
    console.log(`${String(new Date).split(" ", 5).join(" ")}`)
    console.log(`The client has got rate limited for a certain repetitive action.`)
    console.log(rateLimitData)
}

