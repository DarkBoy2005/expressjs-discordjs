const fs = require("fs");
const chalk = require("chalk")

module.exports = (client) => {
	client.componentHandler = async () => {
		try {
			const componentsFolders = fs.readdirSync(`./components`);
			for (const folder of componentsFolders) {
				const typeFolders = fs.readdirSync(`./components/${folder}`);
				for (const folder2 of typeFolders) {
					const componentFiles = fs
						.readdirSync(`./components/${folder}/${folder2}`)
						.filter((file) => file.endsWith(`.js`));
					const { buttons, selectMenus, modals } = client;
					switch (folder) {
						case "buttons":
							try {
								for (const file of componentFiles) {
									try {
										const button = require(`../../components/${folder}/${folder2}/${file}`);
										buttons.set(file.replace(`.js`, ""), button);
									} catch (e) {
										console.log(chalk.bgRed.black(`/----------------------------------------------------------------\\`))
										console.log(`${chalk.red(`${chalk.underline(`Couldn't load ${file.replace(`.js`, "")} ${folder}:`)}`)}`)
										console.error(e)
										console.log(chalk.bgRed.black(`\\----------------------------------------------------------------/`))
									}
								}
							} catch (e) {
								console.log(chalk.bgRed.black(`/----------------------------------------------------------------\\`))
								console.log(`${chalk.red(`${chalk.underline(`${folder} component loader error:`)}`)}`)
								console.error(e)
								console.log(chalk.bgRed.black(`\\----------------------------------------------------------------/`))
							}
							break;
						case "selectMenus":
							try {
								for (const file of componentFiles) {
									try {
										const menu = require(`../../components/${folder}/${folder2}/${file}`);
										selectMenus.set(file.replace(`.js`, ""), menu);
									} catch (e) {
										console.log(chalk.bgRed.black(`/----------------------------------------------------------------\\`))
										console.log(`${chalk.red(`${chalk.underline(`Couldn't load ${file.replace(`.js`, "")} ${folder}:`)}`)}`)
										console.error(e)
										console.log(chalk.bgRed.black(`\\----------------------------------------------------------------/`))
									}
								}
							} catch (e) {
								console.log(chalk.bgRed.black(`/----------------------------------------------------------------\\`))
								console.log(`${chalk.red(`${chalk.underline(`${folder} component loader error:`)}`)}`)
								console.error(e)
								console.log(chalk.bgRed.black(`\\----------------------------------------------------------------/`))
							}
							break;
						case "modals":
							try {
								for (const file of componentFiles) {
									try {
										const modal = require(`../../components/${folder}/${folder2}/${file}`);
										modals.set(file.replace(`.js`, ""), modal);
									} catch (e) {
										console.log(chalk.bgRed.black(`/----------------------------------------------------------------\\`))
										console.log(`${chalk.red(`${chalk.underline(`Couldn't load ${file.replace(`.js`, "")} ${folder}:`)}`)}`)
										console.error(e)
										console.log(chalk.bgRed.black(`\\----------------------------------------------------------------/`))
									}
								}
								break;
							} catch (e) {
								console.log(chalk.bgRed.black(`/----------------------------------------------------------------\\`))
								console.log(`${chalk.red(`${chalk.underline(`${folder} component loader error:`)}`)}`)
								console.error(e)
								console.log(chalk.bgRed.black(`\\----------------------------------------------------------------/`))
							}
						default:
							break;
					}
				}
			}
		} catch (e) {
			console.log(chalk.bgRed.black(`/----------------------------------------------------------------\\`))
			console.log(chalk.red(`Internal error occured:`))
			console.error(e)
			console.log(chalk.bgRed.black(`\\----------------------------------------------------------------/`))
		}
	};
};
