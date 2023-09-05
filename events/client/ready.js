const { PrismaClient } = require(`@prisma/client`);
const prisma = new PrismaClient();
let chalk = require('chalk');
module.exports = async (client) => {
	const { GiveawaysManager } = require('discord-giveaways');
	const manager = new GiveawaysManager(client, {
		storage: './giveaways.json',
		default: {
			botsCanWin: false,
			embedColor: '#FF0000',
			embedColorEnd: '#000000',
			reaction: '🎉'
		}
	});
	//Development server
	client.warningEmoji = client.emojis.cache.get(`1026489379268608123`); //orange !
	client.errorEmoji = client.emojis.cache.get(`1026489382070386728`); //red !
	client.yesEmoji = client.emojis.cache.get(`993182821965369374`); //animated yes
	client.noEmoji = client.emojis.cache.get(`993182968967335958`); //animated no
	client.successEmoji = client.emojis.cache.get(`1026511215750553680`); //check
	client.disturbance = client.emojis.cache.get(`1026489391155253308`); //disturbance
	client.noService = client.emojis.cache.get(`1026489371064545431`); //noservice
	client.available = client.emojis.cache.get(`1026489395576049855`); //available
	client.unavailable = client.emojis.cache.get(`1026489386864492625`) //unavailable
	client.crossEmoji = client.emojis.cache.get(`1026513638628016179`); //red cross
	client.msgEmoji = client.emojis.cache.get(`994540437182369792`); //blue email
	client.loadingEmoji = client.emojis.cache.get(`993229855443398656`); //rainbow jumping
	client.onlineUser = client.emojis.cache.get(`1026511192463777792`) //online
	client.idleUser = client.emojis.cache.get(`1026511185715142696`) //idle
	client.dndUser = client.emojis.cache.get(`1026511188022014002`) //dnd
	client.offlineUser = client.emojis.cache.get(`1026511190354047068`) //offline
	client.boosterEmoji = client.emojis.cache.get(`1024328718467993650`) //booster
	client.denyEmoji = client.emojis.cache.get(`1026489376450027550`) //deny
	client.Hypesquad = client.emojis.cache.get("1026511206162382900");
	client.HypeSquadOnlineHouse1 = client.emojis.cache.get("1026511213787623504"); //bravery
	client.HypeSquadOnlineHouse2 = client.emojis.cache.get("1026511211988275270"); //brilliance
	client.HypeSquadOnlineHouse3 = client.emojis.cache.get("1026511210000171089"); //balance
	client.PremiumEarlySupporter = client.emojis.cache.get("1026511207890440315");
	client.CertifiedModerator = client.emojis.cache.get("1026511194577707068");
	client.Staff = client.emojis.cache.get("1026511198004449310");
	client.Partner = client.emojis.cache.get("1026511204123938876");
	client.VerifiedDeveloper = client.emojis.cache.get("1033377917700407346");
	client.BugHunterLevel1 = client.emojis.cache.get("1026511202043564063");
	client.BugHunterLevel2 = client.emojis.cache.get("1026511199698960384");
	client.discordIcon = client.emojis.cache.get(`993182823752147027`) //Discord logo
	client.robloxIcon = client.emojis.cache.get(`1045981100159275029`) //Roblox logo
	client.onlineShift = client.emojis.cache.get(`1042539275243233331`)
	client.endShift = client.emojis.cache.get(`1042539272751808513`)
	client.breakShift = client.emojis.cache.get(`1042539271141216287`)
	client.offlineShift = client.emojis.cache.get(`1042539276744802345`)
	client.toggleOn = client.emojis.cache.get(`1109149115327197308`)
	client.toggleOff = client.emojis.cache.get(`1109149155647029298`)
	client.toggle = client.emojis.cache.get(`1109149063313625119`)
	client.replyTop = client.emojis.cache.get(`1109149532312305754`)
	client.replyCenter = client.emojis.cache.get(`1109149530387140638`)
	client.replyBottom = client.emojis.cache.get(`1109149527270768650`)
	client.emptyEmoji = client.emojis.cache.get(`1109149763137441792`) //Empty emoji
	//----
	client.giveawaysManager = manager;
	client.usageErrorColour = 16711680;
	client.internalErrorColour = 6881280;
	client.successColour = 903424;
	client.warningColour = 16754176;
	client.grayColour = 7039851;
	client.blueColour = 35327;



	//Shift module only, max allowed entries to show
	client.max = 15

	client.user.setActivity(
		{ name: `${client.guilds.cache.size} Servers`, type: 3 }
	)

	await client.guilds.cache.forEach(async (guild) => {
		if (await prisma.Modules.count({ where: { id: `${guild.id}` } }) === 0) {
			await prisma.Modules.create({
				data: {
					id: `${guild.id}`
				}
			})
		}
		if (await prisma.Servers.count({ where: { id: `${guild.id}` } }) === 0) {
			await prisma.Servers.create({
				data: {
					id: `${guild.id}`
				}
			})
		}
	})
	console.log(`${chalk.yellow.dim(`[${String(new Date).split(" ", 5).join(" ")}] =>`)} ${chalk.green(`Logged in as ${client.user.tag} ID:${client.user.id} (${chalk.gray.dim(`Monitoring: ${client.guilds.cache.size} Servers; ${client.channels.cache.size} Channels; ${client.users.cache.size} Users`)})`)}`)
}
