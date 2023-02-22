const uuid = require('uuid');

async function join(socket, wss, app) {
    console.log(`\x1b[34m[${new Date().toLocaleString()}] ` + `\x1b[37mConnected: \x1b[32m${app}\x1b[0m`)
    socket.send(JSON.stringify({
        "header": {
            "version": 1, "requestId": uuid.v4(), "messageType": "commandRequest", "messagePurpose": "subscribe"
        },
        "body": {
            "eventName": "PlayerMessage"
        },
    }))
    socket.send(JSON.stringify({
        "header": { "version": 1, "requestId": uuid.v4(), "messagePurpose": "commandRequest", "messageType": "commandRequest" },
        "body": {
            "commandLine": `tellraw @a {"rawtext":[{"text":"§8[§eServer§8]: §7You have successfully connected to the server.\n§f- §7Use §l/connect off§r§7 to disconnect the server from the world."}]}`
        }
    }))
    socket.send(JSON.stringify({
        "header": { "version": 1, "requestId": uuid.v4(), "messagePurpose": "commandRequest", "messageType": "commandRequest" },
        "body": {
            "commandLine": `playsound note.pling @a`
        }
    }))
    socket.send(JSON.stringify({
        "header": { "version": 1, "requestId": uuid.v4(), "messagePurpose": "commandRequest", "messageType": "commandRequest" },
        "body": {
            "commandLine": `title @a title §l§aConnected Server`
        }
    }))
    socket.send(JSON.stringify({
        "header": { "version": 1, "requestId": uuid.v4(), "messagePurpose": "commandRequest", "messageType": "commandRequest" },
        "body": {
            "commandLine": `title @a subtitle §fBy MiguelFacte`
        }
    }))
}

async function cheer(socket, wss, app, channel, userstate, message) {
    socket.send(JSON.stringify({
        "header": {
            "version": 1, "requestId": uuid.v4(), "messageType": "commandRequest", "messagePurpose": "subscribe"
        },
        "body": {
            "eventName": "PlayerMessage"
        },
    }))
    socket.send(JSON.stringify({
        "header": { "version": 1, "requestId": uuid.v4(), "messagePurpose": "commandRequest", "messageType": "commandRequest" },
        "body": {
            "commandLine": `tellraw @a {"rawtext":[{"text":"\n\n§l§5${userstate.bits} bits: \n- §l§a${userstate['display-name']}: §r§f${message}\n\n"}]}`
        }
    }))
    socket.send(JSON.stringify({
        "header": { "version": 1, "requestId": uuid.v4(), "messagePurpose": "commandRequest", "messageType": "commandRequest" },
        "body": {
            "commandLine": `playsound note.pling @a`
        }
    }))
    socket.send(JSON.stringify({
        "header": { "version": 1, "requestId": uuid.v4(), "messagePurpose": "commandRequest", "messageType": "commandRequest" },
        "body": {
            "commandLine": `title @a title §l§5${userstate.bits} bits!`
        }
    }))
    socket.send(JSON.stringify({
        "header": { "version": 1, "requestId": uuid.v4(), "messagePurpose": "commandRequest", "messageType": "commandRequest" },
        "body": {
            "commandLine": `title @a subtitle §l§f${userstate['display-name']}`
        }
    }))
}

async function subscription(socket, wss, app, channel, username, method, message, userstate) {
    socket.send(JSON.stringify({
        "header": {
            "version": 1, "requestId": uuid.v4(), "messageType": "commandRequest", "messagePurpose": "subscribe"
        },
        "body": {
            "eventName": "PlayerMessage"
        },
    }))
    socket.send(JSON.stringify({
        "header": { "version": 1, "requestId": uuid.v4(), "messagePurpose": "commandRequest", "messageType": "commandRequest" },
        "body": {
            "commandLine": `tellraw @a {"rawtext":[{"text":"\n§l§5Subscription: \n- §l§a${userstate['display-name']}\n\n"}]}`
        }
    }))
    socket.send(JSON.stringify({
        "header": { "version": 1, "requestId": uuid.v4(), "messagePurpose": "commandRequest", "messageType": "commandRequest" },
        "body": {
            "commandLine": `playsound note.pling @a`
        }
    }))
    socket.send(JSON.stringify({
        "header": { "version": 1, "requestId": uuid.v4(), "messagePurpose": "commandRequest", "messageType": "commandRequest" },
        "body": {
            "commandLine": `title @a title §l§5Subscription!`
        }
    }))
    socket.send(JSON.stringify({
        "header": { "version": 1, "requestId": uuid.v4(), "messagePurpose": "commandRequest", "messageType": "commandRequest" },
        "body": {
            "commandLine": `title @a subtitle §l§f${userstate['display-name']}`
        }
    }))
}

async function subgift(socket, wss, app, channel, username, streakMonths, recipient, methods, userstate) {
    socket.send(JSON.stringify({
        "header": {
            "version": 1, "requestId": uuid.v4(), "messageType": "commandRequest", "messagePurpose": "subscribe"
        },
        "body": {
            "eventName": "PlayerMessage"
        },
    }))
    socket.send(JSON.stringify({
        "header": { "version": 1, "requestId": uuid.v4(), "messagePurpose": "commandRequest", "messageType": "commandRequest" },
        "body": {
            "commandLine": `tellraw @a {"rawtext":[{"text":"\n§l§5Subscription Gift: \n- §l§a${username} §fgave a sub to §a${recipient}\n\n"}]}`
        }
    }))
    socket.send(JSON.stringify({
        "header": { "version": 1, "requestId": uuid.v4(), "messagePurpose": "commandRequest", "messageType": "commandRequest" },
        "body": {
            "commandLine": `playsound note.pling @a`
        }
    }))
    socket.send(JSON.stringify({
        "header": { "version": 1, "requestId": uuid.v4(), "messagePurpose": "commandRequest", "messageType": "commandRequest" },
        "body": {
            "commandLine": `title @a title §l§5Subscription Gift!`
        }
    }))
    socket.send(JSON.stringify({
        "header": { "version": 1, "requestId": uuid.v4(), "messagePurpose": "commandRequest", "messageType": "commandRequest" },
        "body": {
            "commandLine": `title @a subtitle §l§a${username} §fgave a sub to §a${recipient}`
        }
    }))
}

async function submysterygift(socket, wss, app, channel, username, numbOfSubs, methods, userstate) {
    socket.send(JSON.stringify({
        "header": {
            "version": 1, "requestId": uuid.v4(), "messageType": "commandRequest", "messagePurpose": "subscribe"
        },
        "body": {
            "eventName": "PlayerMessage"
        },
    }))
    socket.send(JSON.stringify({
        "header": { "version": 1, "requestId": uuid.v4(), "messagePurpose": "commandRequest", "messageType": "commandRequest" },
        "body": {
            "commandLine": `tellraw @a {"rawtext":[{"text":"\n§l§5Subscription Gift: \n- §l§a${username}§f gave §a${numbOfSubs} subs\n\n"}]}`
        }
    }))
    socket.send(JSON.stringify({
        "header": { "version": 1, "requestId": uuid.v4(), "messagePurpose": "commandRequest", "messageType": "commandRequest" },
        "body": {
            "commandLine": `playsound note.pling @a`
        }
    }))
    socket.send(JSON.stringify({
        "header": { "version": 1, "requestId": uuid.v4(), "messagePurpose": "commandRequest", "messageType": "commandRequest" },
        "body": {
            "commandLine": `title @a title §l§5Subscription Gift!`
        }
    }))
    socket.send(JSON.stringify({
        "header": { "version": 1, "requestId": uuid.v4(), "messagePurpose": "commandRequest", "messageType": "commandRequest" },
        "body": {
            "commandLine": `title @a subtitle §l§a${username}§f gave §a${numbOfSubs} subs`
        }
    }))
}

module.exports = { join, cheer, subscription, subgift, submysterygift };