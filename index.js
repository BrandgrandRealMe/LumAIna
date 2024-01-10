require("dotenv").config();

const MPP = require("mpp-client-net");
const bl = require("betterdevlogs");
const { Client } = require("revolt.js");


// For Commands
const { Hercai } = require("hercai");
const { SwearShield } = require("swear-shield");
const filter = new SwearShield();
const axios = require("axios");
const imgbbUploader = require("imgbb-uploader");
const fs = require("fs");
const MidiPlayer = require("midi-player-js");


const log = bl({ logfolder: "logs" }); // Better Logs By Me (BrandgrandReal)

const config = require("./config.json");
log.debug(
  `Loaded Config | Prefix - ${config.prefix}, Name: ${config.name}, Room: ${config.room}, Color: ${config.color}, Owner: ${config.owner}, BotID: ${config.botid}`
);

const cl = new MPP("wss://mppclone.com:8443", process.env.TOKEN);
const client = new Client();
const hercai = new Hercai();

const commandsfolder = "./commands";
const commands = fs
  .readdirSync(commandsfolder)
  .filter((file) => file.endsWith(".js"));

function truncate(str, n, useWordBoundary) {
  if (str.length <= n) {
    return str;
  }
  const subString = str.slice(0, n - 1); // the original check
  return (
    (useWordBoundary
      ? subString.slice(0, subString.lastIndexOf(" "))
      : subString) + "…"
  );
}

function sendmsg(msg, rplto) {
  cl.sendArray([
    {
      m: "a",
      message: msg.replace(/\n+/g, " ").trim(512),
    },
  ]);
  client.channels.get("01HKQGAFGNNDSPTWDW2MPA8X5X").sendMessage({
    content: msg,
    masquerade: {
      name: truncate(config.name, 32, false),
      colour: config.color,
    },
  });
}
const keyNameMap = require("./keyNameMap.js")
 const Player = new MidiPlayer.Player(async function (event) {
  if (
    event.name == "Note off" ||
    (event.name == "Note on" && event.velocity === 0)
  ) {
    cl.stopNote(keyNameMap[event.noteName]);
  } else if (event.name == "Note on") {
    cl.startNote(keyNameMap[event.noteName], event.velocity / 127);
  } else if (event.name == "Set Tempo") {
    Player.setTempo(event.data);
  }
});


// Message handler
cl.on("a", async (msg) => {
  const id = msg.p._id;
  if (id == config.botid) return;
  if (!msg || !msg.a) return;
  client.channels.get("01HKQGAFGNNDSPTWDW2MPA8X5X").sendMessage({
    content: msg.a,
    masquerade: {
      name: truncate(msg.p.name, 32, false),
      colour: msg.p.color,
    },
  });
  if (!msg.a.startsWith(config.prefix)) return;
  const args = msg.a.slice(config.prefix.length).trim().split(/ +/);
  const commandName = args.shift().toLowerCase();

  if (commandName === "help") {
    const commandFiles = fs
      .readdirSync(commandsfolder)
      .filter((file) => file.endsWith(".js"));
    const commandList = commandFiles
      .map((file) => file.replace(".js", ""))
      .join(", ");
    sendmsg(`Commands: ${commandList}`);
    return;
  }
  const command = commands.find((file) => file.split(".")[0] === commandName);
  if (!command) return;
  try {
    const commandFile = require(`./commands/${command}`);
    commandFile(cl, args, msg, sendmsg, hercai, Player);
  } catch (e) {
    log.error(`Error while loading command ${commandName}.js`);
    console.log(e);
  }
});

client.on("messageCreate", async (message) => {
  if (!message || !message.content) return;
  let bridgechannel = "01HKQGAFGNNDSPTWDW2MPA8X5X";
  if (message.channel.id != bridgechannel) return;
  let authorId = message.author.id;
  if (authorId == "01HKQGEJZ2VE62MZ7W6FXR87NX") return;
  const user =
    client.users.get(authorId) || (await client.usets.fetch(authorId));
  const msg = message.content.replace(/\n+/g, " ").trim(512);
  cl.sendArray([
    {
      m: "a",
      message: `${user.username}: ${msg}`,
    },
  ]);
  if (!message.content.startsWith(config.prefix)) return;
});

client.on("ready", async () =>
  log.server(`REVOLT: Logged in as ${client.user.username}!`)
);

// On join
cl.on("hi", () => {
  cl.sendArray([
    {
      m: "userset",
      set: { name: config.name, color: config.color },
    },
  ]);
  log.server(`MPP: Logged in as ${config.name}`);
});

// start MPP & Revolt client & set room
client.loginBot(process.env.RTOKEN);
cl.start();
cl.setChannel(config.room);

// To keep bot running :)
process.on("uncaughtException", function (error) {
  console.log(error.stack);
});
