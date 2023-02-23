# Twitch in Minecraft Bedrock
Connect your or someone else's channel's Twitch chat, donations, and subscriptions to the Minecraft Bedrock chat using WebSockets

## Installation

Requires [Node.js](https://nodejs.org/) to run.

Install the dependencies and start the server.

```sh
npm i ws
npm i uuid
npm i tmi.js
npm i os
npm i node-os-utils
```

You must fill the [config.json](https://github.com/MiguelFacte/Twitch-in-Minecraft-Bedrock/blob/main/src/config/config.json) file with the Twitch channel information. You can get the password here [Twitch Console](https://dev.twitch.tv/console), by registering a new app.
```json
{
  "port": "9090",
  "twitch": [
    {
      "channels": [
        "MiguelFacte",
        "CHANNEL_2"
      ],
      "password": "twitch Client Secret"
    }
  ]
}
```

## Run the WebSocket
To run the WebSocket, you have to open a console and run the following command
```sh
node .
```
## Connect with Minecraft Bedrock
To connect the WebSocket with Minecraft Bedrock, you must write the ```/connect``` command, then put your ipv4 and followed by the port, in this case in the [config.json](https://github.com/MiguelFacte/Twitch-in-Minecraft-Bedrock/blob/main/src/config/config.json) file it is defined as 9090 in the port, so through that port will connect
#### Example:
```sh
/connect 192.168.1.5:9090
```

##### Do you have any question?
If so, do not hesitate to enter my [Discord server](https://discord.gg/bAEZqtxr82).
