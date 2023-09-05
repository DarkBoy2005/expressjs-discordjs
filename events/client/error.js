const log = require('log-to-file');
const chalk = require(`chalk`)
module.exports = (client, error) => {
    log(error.stack, `./logs/error-logs.log`)
    console.log(chalk.red(`${String(new Date).split(" ", 5).join(" ")} Error logged`))
}

