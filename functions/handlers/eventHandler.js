const fs = require("fs");
const chalk = require("chalk");
const allevents = [];

module.exports = async (client) => {
	client.eventHandler = async () => {
		try {
			const load_dir = (dir) => {
				const event_files = fs
					.readdirSync(`./events/${dir}`)
					.filter((file) => file.endsWith(".js"));
				for (const file of event_files) {
					const event = require(`../../events/${dir}/${file}`);
					let eventName = file.split(".")[0];
					try {
						allevents.push(eventName);
						client.on(eventName, event.bind(null, client));
					} catch (e) {
						console.log(chalk.bgRed.black(`/----------------------------------------------------------------\\`))
						console.log(`${chalk.red(`${chalk.underline(`Couldn't load ${dir}.${eventName} event:`)}`)}`)
						console.error(e)
						console.log(chalk.bgRed.black(`\\----------------------------------------------------------------/`))
					}
				}
			};
			["client", "guild", "logging"].forEach((e) => load_dir(e));
		} catch (err) {
			console.log(chalk.bgRed(`An error occured: ${chalk.bgBlack.red(err)}`));
		}
	};
};
