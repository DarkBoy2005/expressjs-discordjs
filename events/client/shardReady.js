let chalk = require('chalk');
module.exports = (client, id) => {
    console.log(`${chalk.yellow.dim(`[${String(new Date).split(" ", 5).join(" ")}] => `)}${chalk.green(`Shard #${id}'s WebSocket connected and ready for use`)}.`)
}

