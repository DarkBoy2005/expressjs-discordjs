const log = require('log-to-file');
module.exports = (client, event) => {
    if(event.t === "GUILD_CREATE") {
        const tmp = event.d;
        let role = tmp.roles
        let member = tmp.members
        let channel = tmp.channels
        let emoji = tmp.emojis
        let thread = tmp.threads
        let presence = tmp.presences
        let roles = tmp.roles.length
        let members = tmp.members.length
        let channels = tmp.channels.length
        let emojis = tmp.emojis.length
        let threads = tmp.threads.length
        let presences = tmp.presences.length
        tmp.roles = roles
        tmp.members = members
        tmp.channels = channels
        tmp.emojis = emojis
        tmp.threads = threads
        tmp.presences = presences
        log(event.t + ` => ` + JSON.stringify(tmp).replace(/\\/g, ``), `./logs/all.log`)
        tmp.roles = role
        tmp.members = member
        tmp.channels = channel
        tmp.emojis = emoji
        tmp.threads = thread
        tmp.presences = presence
    } else {
        if (event.t !== "PRESENCE_UPDATE") log(JSON.stringify(event.d).replace(/\\/g, ``), `./logs/all.log`)
    }
    let clientEvents = [
        `DEBUG`,
        `ERROR`,
        `INVALIDATED`,
        `INVALID_REQUEST_WARNING`,
        `RATE_LIMIT`,
        `READY`,
        `SHARD_DISCONNECT`,
        `SHARD_ERROR`,
        `SHARD_READY`,
        `SHARD_RECONNECTING`,
        `SHARD_RESUME`,
        `USER_UPDATE`,
        `VOICE_STATE_UPDATE`,
        `WARN`,
        `WEBHOOK_UPDATE`
    ]
    let guildEvents = [
        `GUILD_CREATE`,
        `APPLICATION_COMMAND_PERMISSIONS_UPDATE`,
        `API_REQUEST`,
        `API_RESPONSE`,
        `CHANNEL_CREATE`,
        `CHANNEL_DELETE`,
        `CHANNEL_PINS_UPDATE`,
        `CHANNEL_UPDATE`,
        `EMOJI_CREATE`,
        `EMOJI_DELETE`,
        `EMOJI_UPDATE`,
        `GUILD_BAN_ADD`,
        `GUILD_BAN_REMOVE`,
        `GUILD_CREATE`,
        `GUILD_DELETE`,
        `GUILD_INTEGRATIONS_UPDATE`,
        `GUILD_MEMBER_ADD`,
        `GUILD_MEMBER_AVAILABLE`,
        `GUILD_MEMBER_REMOVE`,
        `GUILD_MEMBERS_CHUNK`,
        `GUILD_MEMBER_UPDATE`,
        `GUILD_SCHEDULED_EVENT_CREATE`,
        `GUILD_SCHEDULED_EVENT_DELETE`,
        `GUILD_SCHEDULED_EVENT_UPDATE`,
        `GUILD_SCHEDULED_EVENT_USER_ADD`,
        `GUILD_SCHEDULED_EVENT_USER_REMOVE`,
        `GUILD_UNAVAILABLE`,
        `GUILD_UPDATE`,
        `INTERACTION`,
        `INTERACTION_CREATE`,
        `INVITE_CREATE`,
        `INVITE_DELETE`,
        `MESSAGE_CREATE`,
        `MESSAGE_DELETE`,
        `MESSAGE_DELETE_BULK`,
        `MESSAGE_REACTION_ADD`,
        `MESSAGE_REACTION_REMOVE`,
        `MESSAGE_REACTION_REMOVE_ALL`,
        `MESSAGE_REACTION_REMOVE_EMOJI`,
        `MESSAGE_UPDATE`,
        `ROLE_CREATE`,
        `ROLE_DELETE`,
        `ROLE_UPDATE`,
        `STAGE_INSTANCE_CREATE`,
        `STAGE_INSTANCE_DELETE`,
        `STAGE_INSTANCE_UPDATE`,
        `STICKER_CREATE`,
        `STICKER_DELETE`,
        `STICKER_UPDATE`,
        `THREAD_CREATE`,
        `THREAD_DELETE`,
        `THREAD_LIST_SYNC`,
        `THREAD_MEMBERS_UPDATE`,
        `THREAD_UPDATE`,
        `TYPING_START`
    ]
    if (event.t === "PRESENCE_UPDATE" || event.t === "GUILD_CREATE" || event.t === null) { return } else { log(event.t + ` => ` + JSON.stringify(event.d).replace(/\\/g, ``), `./logs/temp.log`) }
    if (clientEvents.includes(event.t)) {
        log(event.t + ` => ` + JSON.stringify(event.d).replace(/\\/g, ``)+`\n`, `./logs/client-logs.log`)
    } else
    if (["MESSAGE_CREATE", "MESSAGE_UPDATE"].includes(event.t)) {
        const { author, content, embeds, components, attachments, guild_id, mentions, mention_roles } = event.d;
        const newObject = { "author_id": author.id, content, "embeds": embeds.length, "components": components.length, "attachments": attachments.length, guild_id, "mentions": mentions.length, "mention_roles": mention_roles.length };
        log(`${event.t} => ${JSON.stringify(newObject).replace(/,/g, `\n`).replace(/{/g, `{\n`).replace(/}/g, `\n}`)}`, `./logs/guild-logs.log`)
    } else
    if (["STAGE_INSTANCE_CREATE", "MESSAGE_DELETE", "MESSAGE_REACTION_REMOVE", "GUILD_AUDIT_LOG_ENTRY_CREATE", "THREAD_DELETE", "CHANNEL_PINS_UPDATE"].includes(event.t)) {
        log(`${event.t} => ${JSON.stringify(event.d).replace(/,/g, `\n`).replace(/{/g, `{\n`).replace(/}/g, `\n}`)}`, `./logs/guilds-log.log`)
    } else
    if (["MESSAGE_REACTION_ADD"].includes(event.t)) {
        const { emoji, channel_id, guild_id, user_id, message_id } = event.d;
        const newObject = { emoji, channel_id, guild_id, user_id, message_id };
        log(`${event.t} => ${JSON.stringify(newObject).replace(/,/g, `\n`).replace(/{/g, `{\n`).replace(/}/g, `\n}`)}`, `./logs/guild-logs.log`)
    } else
    if (["CHANNEL_UPDATE", "CHANNEL_CREATE", "CHANNEL_DELETE"].includes(event.t)) {
        const { id, parent_id, topic, name, guild_id } = event.d
        const newObject = { id, parent_id, topic, name, guild_id };
        log(`${event.t} => ${JSON.stringify(newObject).replace(/,/g, `\n`).replace(/{/g, `{\n`).replace(/}/g, `\n}`)}`, `./logs/guild-logs.log`)
    } else
    if (["GUILD_MEMBER_UPDATE"].includes(event.t)) {
        const { user, guild_id } = event.d
        const newObject = { user, guild_id };
        log(`${event.t} => ${JSON.stringify(newObject).replace(/,/g, `\n`).replace(/{/g, `{\n`).replace(/}/g, `\n}`)}`, `./logs/guild-logs.log`)
    } else
    if (["USER_UPDATE"].includes(event.t)) {
        const { id, username, bio } = event.d
        const newObject = { id, username, bio };
        log(`${event.t} => ${JSON.stringify(newObject).replace(/,/g, `\n`).replace(/{/g, `{\n`).replace(/}/g, `\n}`)}`, `./logs/guild-logs.log`)
    } else
    if (["THREAD_CREATE"].includes(event.t)) {
        const { id, guild_id, parent_id, owner_id, name } = event.d
        const newObject = { id, guild_id, parent_id, owner_id, name };
        log(`${event.t} => ${JSON.stringify(newObject).replace(/,/g, `\n`).replace(/{/g, `{\n`).replace(/}/g, `\n}`)}`, `./logs/guild-logs.log`)
    } else
    if (["THREAD_MEMBERS_UPDATE"].includes(event.t)) {
        const { id, member_count, guild_id, added_members, name } = event.d
        const newObject = { id, member_count, guild_id, name, "added_members": added_members.length };
        log(`${event.t} => ${JSON.stringify(newObject).replace(/,/g, `\n`).replace(/{/g, `{\n`).replace(/}/g, `\n}`)}`, `./logs/guild-logs.log`)
    } else
    if (["THREAD_UPDATE"].includes(event.t)) {
        const { id, guild_id, parent_id, owner_id, name, member_count, message_count } = event.d
        const newObject = {  id, guild_id, parent_id, owner_id, name, member_count, message_count };
        log(`${event.t} => ${JSON.stringify(newObject).replace(/,/g, `\n`).replace(/{/g, `{\n`).replace(/}/g, `\n}`)}`, `./logs/guild-logs.log`)
    } else
    if (["THREAD_LIST_SYNC"].includes(event.t)) {
        const { threads, guild_id, members, channel_ids } = event.d
        const newObject = { guild_id, channel_ids, "members": members.length, "threads": threads.length };
        log(`${event.t} => ${JSON.stringify(newObject).replace(/,/g, `\n`).replace(/{/g, `{\n`).replace(/}/g, `\n}`)}`, `./logs/guild-logs.log`)
    } else
    if (["GUILD_ROLE_UPDATE", "GUILD_ROLE_CREATE"].includes(event.t)) {
        const { role, guild_id} = event.d
        const newObject = { guild_id, "role_name": role.name, "role_id": role.id, "role_color": role.color, "role_permissions": role.permissions};
        log(`${event.t} => ${JSON.stringify(newObject).replace(/,/g, `\n`).replace(/{/g, `{\n`).replace(/}/g, `\n}`)}`, `./logs/guild-logs.log`)
    } else
    if (["APPLICATION_COMMAND_PERMISSIONS_UPDATE"].includes(event.t)) {
        const { permissions, id, guild_id, application_id} = event.d
        const newObject = {id, guild_id, application_id, "permissions_changed": permissions.length};
        log(`${event.t} => ${JSON.stringify(newObject).replace(/,/g, `\n`).replace(/{/g, `{\n`).replace(/}/g, `\n}`)}`, `./logs/guild-logs.log`)
    } else 
    if (["GUILD_ROLE_DELETE"].includes(event.t)) {
        const { role_id, guild_id } = event.d
        const newObject = {role_id, guild_id};
        log(`${event.t} => ${JSON.stringify(newObject).replace(/,/g, `\n`).replace(/{/g, `{\n`).replace(/}/g, `\n}`)}`, `./logs/guild-logs.log`)
    } else 
    if (["TYPING_START"].includes(event.t)) {
        const { channel_id, guild_id, user_id } = event.d
        const newObject = {channel_id, guild_id, user_id }; 
        log(`${event.t} => ${JSON.stringify(newObject).replace(/,/g, `\n`).replace(/{/g, `{\n`).replace(/}/g, `\n}`)}`, `./logs/guild-logs.log`)
    }
}

