const WebSocket = require('ws');
const uuid = require('uuid');
const fs = require('fs');
const config = require('./src/config/config.json');
const wss = new WebSocket.Server({ port: config.port });
const connection = require('./src/utils/connection');
const tmi = require('tmi.js');
const os = require('os');
const startTime = Date.now();

const commands = {};
let ms = 0;

const commandFiles = fs.readdirSync('./src/commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
    const command = require(`./src/commands/${file}`);
    commands[command.name] = command;
}

console.log(`\x1b[34m[${new Date().toLocaleString()}] \x1b[37mWebSocket Online\x1b[0m`);
console.log(`\x1b[34m[${new Date().toLocaleString()}] \x1b[37mWebSocket Port: \x1b[32m${config.port}\x1b[0m`);
console.log(`\x1b[34m[${new Date().toLocaleString()}] \x1b[37mCommands: \x1b[32m${Object.keys(commands).length}\x1b[0m`);
console.log(`\x1b[34m[${new Date().toLocaleString()}] \x1b[37mTwitch:` + ` \x1b[32m${config.twitch[0].channels}\x1b[0m`);

const options = {
    options: {
        debug: false
    },
    connection: {
        reconnect: true,
        secure: true
    },
    identity: {
        password: config.twitch[0].password
    },
    channels: config.twitch[0].channels
};

const client = new tmi.client(options);
client.on('connecting', () => console.log(`\x1b[34m[${new Date().toLocaleString()}]` + `\x1b[37m Twitch logging in\x1b[0m`))
    .on('connected', (_, port) => console.log(`\x1b[34m[${new Date().toLocaleString()}]` + `\x1b[37m Twitch connected: \x1b[32m${port}\x1b[0m`))
    .on('pong', latency => { ms = latency })
    .on("disconnected", (reason) => console.log(`\x1b[34m[${new Date().toLocaleString()}]` + `\x1b[37m Twitch disconnected: ${reason}\x1b[0m`))
    .connect().catch(console.error);

const interfaces = os.networkInterfaces();

for (const interfaceName in interfaces) {
    const interface = interfaces[interfaceName];

    for (const address of interface) {
        if (!address.internal && address.family === 'IPv4') {
            console.log(`\x1b[34m[${new Date().toLocaleString()}] \x1b[37mIPv4: \x1b[32m${address.address}\x1b[0m`);
        }
    }
}

wss.on('connection', (socket, req) => {
    const ip = req.socket.remoteAddress;
    const app = ip.replace("::ffff:", "");

    connection.join(socket, wss, app, true);

    client.on('message', (channel, userstate, message, self) => {
        socket.send(JSON.stringify({
            "header": { "version": 1, "requestId": uuid.v4(), "messagePurpose": "commandRequest", "messageType": "commandRequest" },
            "body": {
                "commandLine": `tellraw @a {"rawtext":[{"text":"§l§7[§5Twi§ftch§7]§r §7${userstate['display-name']}: §f${message}"}]}`
            }
        }))
    });

    client.on("cheer", (channel, userstate, message) =>
        connection.cheer(socket, wss, app, channel, userstate, message, true)
    )
        .on("subscription", (channel, username, method, message, userstate) =>
            connection.subscription(socket, wss, app, channel, username, method, message, userstate, true)
        )
        .on("subgift", (channel, username, streakMonths, recipient, methods, userstate) =>
            connection.subgift(socket, wss, app, channel, username, streakMonths, recipient, methods, userstate, true)
        )
        .on("submysterygift", (channel, username, numbOfSubs, methods, userstate) =>
            connection.submysterygift(socket, wss, app, channel, username, numbOfSubs, methods, userstate, true)
        );

    socket.on('message', async (packet) => {
        if (!JSON.parse(packet).header.eventName == 'PlayerMessage' && JSON.parse(packet).body.type == 'chat') return;

        const message = JSON.parse(packet).body.message;
        const sender = JSON.parse(packet).body.sender

        const command = commands[message];
        if (command) {
            command.execute(socket, message, sender, wss, startTime, ms, uuid);
        }
    });

    socket.addEventListener('close', (event) => {
        console.log(`\x1b[34m[${new Date().toLocaleString()}]` + `\x1b[37m Disconnected: \x1b[32m${app}\x1b[0m`)
    });
});

process.on('unhandledRejection', (error, promise) => {
    console.error(`\x1b[31m[${new Date().toLocaleString()}]\x1b[0m ` + `unhandledRejection:`, error);
});
process.on("uncaughtException", (err, origin) => {
    console.error(`\x1b[31m[${new Date().toLocaleString()}]\x1b[0m ` + `uncaughtException:`, err);
});
process.on("uncaughtExceptionMonitor", (err, origin) => {
    console.error(`\x1b[31m[${new Date().toLocaleString()}]\x1b[0m ` + `uncaughtExceptionMonitor:`, err);
});
process.on("multipleResolves", () => { });
