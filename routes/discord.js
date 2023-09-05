const router = require("express").Router();

router.get("/getUser/:id", (req, res) => {
    const userId = req.params.id;
    const client = req.client
    client.guilds
    const user = client.guilds.cache.get(process.env.GUILD_ID).members.cache.get(userId)
    user.roles
    const perm = user.roles.cache.some(role => role.id === '1107969787541340191')

    if (user) {
        res.status(200).json({
            access: perm
        });
    } else {
        res.status(404).json({ error: 'User not found' });
    }
});
module.exports = router