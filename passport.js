const DiscordStrategy = require("passport-discord").Strategy;
const passport = require("passport");
const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

passport.use(
    new DiscordStrategy(
        {
            clientID: process.env.CLIENT_ID,
            clientSecret: process.env.CLIENT_SECRET,
            callbackURL: "/auth/discord/callback",
            scope: ['identify', 'guilds', 'email']
        },
        async function (accessToken, refreshToken, profile, done) {
            if (await prisma.User.count({ where: { id: BigInt(profile.id) } }) === 0) {
                await prisma.User.create({
                    data: {
                        id: BigInt(profile.id),
                        email: profile.email,
                        name: profile.username
                    }
                })
            }
            let user = {
                id: profile.id,
                name: profile.username,
                email: profile.email,
                avatar: profile.avatar
            }
            done(null, user);
        }
    )
);

passport.serializeUser(async (user, done) => {
    console.log('Serialized')
    done(null, user);
});

passport.deserializeUser(async (user, done) => {
    console.log('Deserialized')
    let check = await prisma.User.findUnique({
        where: {
            id: BigInt(user.id)
        }
    })
    if (check) done(null, user);
});
