const fs = require(`fs`);
const { Routes } = require("discord-api-types/v9");
const { REST } = require("@discordjs/rest");
const chalk = require('chalk')
require('dotenv').config();

module.exports = (client) => {
    client.commandHandler = async () => {
        try {
            const commandFolder = fs.readdirSync(`./slashCommands/global`);
            const rest = new REST({ version: '9' }).setToken(process.env.TOKEN);
            for (const folder of commandFolder) {
                const commandFiles = fs
                    .readdirSync(`./slashCommands/global/${folder}`)
                    .filter((file) => file.endsWith(`.js`));
                const { commands, commandArray } = client;
                for (const file of commandFiles) {
                    try {
                        const command = require(`../../slashCommands/global/${folder}/${file}`);
                        commands.set(command.data.name, command);
                        commandArray.push(command.data.toJSON());
                    } catch (e) {
                        console.log(chalk.bgRed.black(`/----------------------------------------------------------------\\`))
                        console.log(`${chalk.red(`${chalk.underline(`Couldn't load ${file.replace(`.js`, "")} (/) command:`)}`)}`)
                        console.error(e)
                        console.log(chalk.bgRed.black(`\\----------------------------------------------------------------/`))
                    }
                }
            }
            try {
                await rest.put(
                    process.env.TESTING === `true`
                        ? Routes.applicationGuildCommands(process.env.CLIENT_ID, process.env.GUILD_ID)
                        : Routes.applicationCommands(process.env.CLIENT_ID),
                    { body: client.commandArray }
                );
            } catch (err) {
                console.log(chalk.bgRed(`An error occured: ${chalk.bgBlack.red(err)}`));
            }
            const servers = fs.readdirSync(`./slashCommands/servers`)
            for (const folder of servers) {
                const server = fs.readdirSync(`./slashCommands/servers/${folder}`)
                const { commands } = client;
                let commandArray2 = []
                for (const cmd of server) {
                    const commandFiles = fs
                        .readdirSync(`./slashCommands/servers/${folder}/${cmd}`)
                        .filter((file) => file.endsWith(`.js`));
                    for (const file of commandFiles) {
                        try {
                            const command = require(`../../slashCommands/servers/${folder}/${cmd}/${file}`);
                            commands.set(command.data.name, command);
                            commandArray2.push(command.data.toJSON());
                            console.log(`loaded ${file}`)
                        } catch (e) {
                            console.log(chalk.bgRed.black(`/----------------------------------------------------------------\\`))
                            console.log(`${chalk.red(`${chalk.underline(`Couldn't load ${file.replace(`.js`, "")} (/) command:`)}`)}`)
                            console.error(e)
                            console.log(chalk.bgRed.black(`\\----------------------------------------------------------------/`))
                        }
                    }
                }

                await rest.put(Routes.applicationGuildCommands(process.env.CLIENT_ID, `${folder}`), { body: commandArray2 })

            }
        } catch (err) {
            console.log(err)
        }
    };
};