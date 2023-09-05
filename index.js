//Discord bot
const fs = require(`fs`);
const {
  Client,
  GatewayIntentBits,
  Partials,
  Collection,
  PermissionsBitField
} = require(`discord.js`);
const client = new Client({
  shards: `auto`,
  allowedMentions: {
    parse: ['users', 'roles', 'everyone'],
    repliedUser: true,
  },
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildBans,
    GatewayIntentBits.GuildIntegrations,
    GatewayIntentBits.GuildWebhooks,
    GatewayIntentBits.GuildInvites,
    GatewayIntentBits.GuildVoiceStates,
    GatewayIntentBits.GuildPresences,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.GuildMessageReactions,
    GatewayIntentBits.GuildMessageTyping,
    GatewayIntentBits.DirectMessages,
    GatewayIntentBits.DirectMessageReactions,
    GatewayIntentBits.DirectMessageTyping,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildScheduledEvents,
  ],
  partials: [
    Partials.Channel,
    Partials.User,
    Partials.GuildMember,
    Partials.Message,
    Partials.Reaction,
    Partials.GuildScheduledEvent,
    Partials.ThreadMember,
  ],
});

client.commands = new Collection();
client.buttons = new Collection();
client.selectMenus = new Collection();
client.modals = new Collection();
client.commandArray = [];

const functionFolder = fs.readdirSync(`./functions`);
for (const folder of functionFolder) {
  const functionFiles = fs
    .readdirSync(`./functions/${folder}`)
    .filter((file) => file.endsWith(`.js`));
  for (const file of functionFiles)
    require(`./functions/${folder}/${file}`)(client);
}

client.commandHandler();
client.eventHandler();
client.antiCrash();
client.functions1();
client.componentHandler();

require('dotenv').config()
const cookieSession = require("cookie-session");
const express = require("express");
const cors = require("cors");
const passportSetup = require("./passport");
const passport = require("passport");
const authRoute = require("./routes/auth");
const app = express();

app.use(
  cookieSession({ name: "session", keys: ["lama"], maxAge: 24 * 60 * 60 * 100 })
);

app.use(passport.initialize());
app.use(passport.session());

app.use(
  cors({
    origin: "http://localhost:3000",
    methods: "GET,POST,PUT,DELETE",
    credentials: true,
  })
);

app.use("/auth", authRoute);

app.listen(process.env.PORT, () => {
  console.log("Server is running!");
});

client.login(process.env.TOKEN);