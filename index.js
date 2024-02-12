require("dotenv").config();

const MPP = require("mpp-client-net");
const bl = require("betterdevlogs");
const { Client } = require("revolt.js");
const { Hercai } = require("hercai");
const fs = require("fs");
const MidiPlayer = require("midi-player-js");
const lodash = require("lodash");

const log = bl({ logfolder: "logs" }); // Better Logs By Me (BrandgrandReal)

const config = require("./config.json");
const blacklist = require("./blacklist.json");
let channelJoinTime = 0;

log.debug(
  `Loaded Config | Prefix - ${config.prefix}, Name: ${config.name}, Room: ${config.room}, Color: ${config.color}, Owner: ${config.owner}, BotID: ${config.botid}`
);

const cl = new MPP("wss://mppclone.com:8443", process.env.TOKEN);
const client = new Client();
const hercai = new Hercai();

// bard stuff
const { GoogleGenerativeAI } = require("@google/generative-ai");
const genAI_KEY = process.env.genAI_KEY;
const genAI = new GoogleGenerativeAI(genAI_KEY);

async function gemini(prompt) {
  // For text-only input, use the gemini-pro model
  const model = genAI.getGenerativeModel({ model: "gemini-pro" });

  const result = await model.generateContent(prompt);
  const response = result.response;
  const text = response.text();
  return text;
}
const shocktoken = process.env.shocktoken;
async function shockAI(prompt, uid) {
  console.log(`SHOCK: PROMPT - ${prompt}; UID - ${uid}; TOKEN - ${shocktoken}`);
  const response = await fetch(
    `http://api.shockbs.is-a.dev/chat?text=${prompt}&id=${uid}&botname=${config.name}`,
    {
      headers: {
          authorization: "Bearer " + shocktoken,
      },
    }
  );
  const data = await response.json();
 if (data.statusCode !== 200) return data.message;
  return data.message;
}

const Sagdb = require("sagdb").default;
const biosdb = new Sagdb({ name: "bio's", minify: false });
const namesdb = new Sagdb({ name: "namesdb", minify: false });
const blacklistdb = new Sagdb({ name: "blacklistdb", minify: false });

const commandsfolder = "./commands";
const commands = fs
  .readdirSync(commandsfolder)
  .filter((file) => file.endsWith(".js"));

function lettersToNumbers(string) {
  let newString = "";
  for (let i = 0; i < string.length; i++) {
    const currentChar = string[i];
    const IsNotNumber = isNaN(currentChar);
    if (IsNotNumber) {
      const number = parseInt(string[i], 36) - 9;
      newString += number.toString();
    } else {
      newString += currentChar;
    }
  }
  return newString;
}
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
function calcMatch(word, base, insensitive = true) {
  insensitive = insensitive ? "i" : "";
  let matching = 0;
  let used = [];
  word.split("").forEach((c) => {
    if (used.includes(c)) return;
    let m = base.match(new RegExp(c, "g" + insensitive));
    used.push(c);
    if (m === null) return;
    matching += m.length;
  });
  return matching / base.length;
}

function sendmsg(msg, rplto) {
  cl.sendArray([
    {
      m: "a",
      message: msg.replace(/\n+/g, " ").trim(512),
    },
  ]);
  client.channels.get(config.bridgeid).sendMessage({
    content: msg,
    masquerade: {
      name: truncate(config.name, 32, false),
      colour: config.color,
    },
  });
}
const keyNameMap = require("./keyNameMap.js");
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

// Animation

let x = 50; // Initial x position
let y = 69; // Initial y position
let dx = 0.5; // Horizontal speed
let dy = 0.5; // Vertical speed

setInterval(() => {
  // Mouse handler
  // Bounce off the edges:
  if (x + 1 > 100 || x < 0) {
    dx = -dx;
  }
  if (y + 1 > 100 || y < 0) {
    dy = -dy;
  }

  // Update the position with the current speed:
  x += dx;
  y += dy;

  const mousePosition = {
    x: x,
    y: y,
  };
  cl.sendArray([{ m: "m", ...mousePosition }]);
}, 50);

// Message handler
cl.on("a", async (msg) => {
  const id = msg.p._id;
  if (id == config.botid) return;
  if (!msg || !msg.a) return;
  client.channels.get(config.bridgeid).sendMessage({
    content: msg.a,
    masquerade: {
      name: truncate(msg.p.name, 32, false),
      colour: msg.p.color,
    },
  });
  if (msg.a.startsWith(`@${cl.participantId}`)) {
    const mention = `@${cl.participantId}`;
    const args = msg.a.slice(mention.length).trim();
    if (!args) return;
    const blacklist = blacklistdb.get(msg.p._id);
    if (blacklist === "ai") return;
    const id = msg.p._id;
    const IDNum = lettersToNumbers(id);
    const text = await shockAI(args, IDNum.substring(0, 20));
    sendmsg(truncate(text, 512, true));
  }
  if (!msg.a.startsWith(config.prefix)) return;
  const blacklist = blacklistdb.get(msg.p._id);
  if (blacklist === "global")
    return sendmsg(
      "You can not use this bots commands! You are blacklisted! Contact BrandgrandReal for any questions!"
    );
  const args = msg.a.slice(config.prefix.length).trim().split(/ +/);
  const commandName = args.shift().toLowerCase();
  if (commandName === "help") {
    let commandList = "";
    const commandFiles = fs
      .readdirSync(commandsfolder)
      .filter((file) => file.endsWith(".js"));
    if (!args[0]) {
      for (const file of commandFiles) {
        const command = require(`./commands/${file}`);
        const cmdName = command.info.name;
        const cmdDesc = command.info.desc;
        const cmdType = command.info.type;
        const cmdMode = command.info.mode;
        const cmdUsage = command.info.usage; // For the FUTURE
        const message = ` [\`${cmdName}\` - ${cmdDesc} | ${cmdType} | ${cmdMode}] `; // `help` - Gives you this message. | Info | GLOBAL
        commandList += message;
      }
      sendmsg(`CMDs: ${commandList}`);
      return;
    } else if (args[0]) {
      const cmd = args[0].toLowerCase();
      const command = commands.find((file) => file.split(".")[0] === cmd);
      if (!command) return console.log("command not found");
      try {
        const commandFile = require(`./commands/${command}`);
        const commandInfo = commandFile.info;
        const message = `\`${config.prefix}${commandInfo.name} ${commandInfo.usage}\` - ${commandInfo.desc} | ${commandInfo.type} | ${commandInfo.mode}`;
        sendmsg(message);
      } catch (e) {
        log.error(`Error while loading command ${commandName}.js`);
        console.log(e);
      }
      return;
    }
  }
  const command = commands.find((file) => file.split(".")[0] === commandName);
  if (!command) {
    const commandFiles = fs
      .readdirSync(commandsfolder)
      .filter((file) => file.endsWith(".js"));
    const matches = commandFiles
      .filter((c) => c.length > 1)
      .map((c) => {
        return {
          score: calcMatch(commandName, c.replace(".js", "")),
          command: c.replace(".js", ""),
        };
      });
    matches.sort((a, b) => b.score - a.score);
    if (matches[0].score < this.minMatchScore) return; // unknown command, not similar to existing one
    const command = matches[0];
    sendmsg(
      `Unknown command. Did you mean \`${config.prefix}${command.command}\`?`
    );
    return;
  }
  try {
    const commandFile = require(`./commands/${command}`);
    commandFile.run(
      cl,
      args,
      msg,
      sendmsg,
      hercai,
      Player,
      biosdb,
      log,
      blacklistdb
    );
  } catch (e) {
    log.error(`Error while loading command ${commandName}.js`);
    console.log(e);
  }
});

client.on("messageCreate", async (message) => {
  if (!message || !message.content) return;
  let bridgechannel = config.bridgeid;
  if (message.channel.id != bridgechannel) return;
  let authorId = message.author.id;
  if (authorId == config.rbotid) return;
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
  const blacklist = blacklistdb.get(authorId);
  if (blacklist === "global")
    return sendmsg(
      "You can not use this bots commands! You are blacklisted! Contact BrandgrandReal for any questions!"
    );
  const args = message.content.slice(config.prefix.length).trim().split(/ +/);
  const commandName = args.shift().toLowerCase();

  if (commandName === "help") {
    let commandList = "";
    const commandFiles = fs
      .readdirSync(commandsfolder)
      .filter((file) => file.endsWith(".js"));
    if (!args[0]) {
      for (const file of commandFiles) {
        const command = require(`./commands/${file}`);
        const cmdName = command.info.name;
        const cmdDesc = command.info.desc;
        const cmdType = command.info.type;
        const cmdMode = command.info.mode;
        const cmdUsage = command.info.usage; // For the FUTURE
        const message = ` [\`${cmdName}\` - ${cmdDesc} | ${cmdType} | ${cmdMode}] `; // `help` - Gives you this message. | Info | GLOBAL
        commandList += message;
      }
      sendmsg(`CMDs: ${commandList}`);
      return;
    } else if (args[0]) {
      const cmd = args[0].toLowerCase();
      const command = commands.find((file) => file.split(".")[0] === cmd);
      if (!command) return console.log("command not found");
      try {
        const commandFile = require(`./commands/${command}`);
        const commandInfo = commandFile.info;
        const message = `\`${config.prefix}${commandInfo.name} ${commandInfo.usage}\` - ${commandInfo.desc} | ${commandInfo.type} | ${commandInfo.mode}`;
        sendmsg(message);
      } catch (e) {
        log.error(`Error while loading command ${commandName}.js`);
        console.log(e);
      }
      return;
    }
  }
  const command = commands.find((file) => file.split(".")[0] === commandName);
  if (!command) {
    const commandFiles = fs
      .readdirSync(commandsfolder)
      .filter((file) => file.endsWith(".js"));
    const matches = commandFiles
      .filter((c) => c.length > 1)
      .map((c) => {
        return {
          score: calcMatch(commandName, c.replace(".js", "")),
          command: c.replace(".js", ""),
        };
      });
    matches.sort((a, b) => b.score - a.score);
    if (matches[0].score < this.minMatchScore) return; // unknown command, not similar to existing one
    const command = matches[0];
    sendmsg(
      `Unknown command. Did you mean \`${config.prefix}${command.command}\`?`
    );
    return;
  }
  try {
    const commandFile = require(`./commands/${command}`);
    commandFile.run(
      cl,
      args,
      msg,
      sendmsg,
      hercai,
      Player,
      biosdb,
      log,
      blacklistdb
    );
  } catch (e) {
    log.error(`Error while loading command ${commandName}.js`);
    console.log(e);
  }
});

client.on("ready", async () => {
  log.server(`REVOLT: Logged in as ${client.user.username}!`);
  client.channels.get(config.bridgeid).sendMessage({
    content: `I am ONLINE`,
  });
  cl.start();
  cl.setChannel(config.room);
});

// On join
cl.on("hi", () => {
  cl.sendArray([
    {
      m: "userset",
      set: { name: config.name, color: config.color },
    },
  ]);
  const roominfo = cl.channel;
  const roomID = config.room;
  if (roominfo) roomID = roominfo.id || config.room;

  const roomUrl = `https://multiplayerpiano.net/?c=${encodeURIComponent(
    roomID
  )}`;
  client.channels.get(config.bridgeid).sendMessage({
    content: `Logged in as \`${config.name}\` in [${roomID}](${roomUrl})`,
  });
  log.server(`MPP: Logged in as ${config.name}`);
  channelJoinTime = Date.now();
});

// REVOLT: update Status
async function FupdateStatus(users, room) {
  client.user.edit({
    status: {
      text: `In room ${room} with ${users} players!`,
      presence: "Focus",
    },
  });
}
let updateStatus = lodash.debounce(FupdateStatus, 9000);

// Room Join and Leave and updates
cl.on("participant added", (p) => {
  if (p._id == config.botid) return;
  if (blacklist.WAL.includes(p._id)) return;
  namesdb.set(p._id, p.name);
  if (Date.now() - channelJoinTime > 125) return;
  client.channels.get(config.bridgeid).sendMessage({
    content: `Player Joined: \`${p._id}\` | \`${p.name}\``,
  });
});

cl.on("p", async (p) => {
  // Catch join and player updates
  namesdb.set(p._id, p.name);
});

cl.on("bye", async (data) => {
  if (data.p == config.botid) return;
  if (blacklist.WAL.includes(data.p)) return;
  const name = namesdb.get(data.p) || "Unknown Name";

  client.channels.get(config.bridgeid).sendMessage({
    content: `Member left room: \`${data.p}\` | \`${name}\``,
  });
});

cl.on("ch", async (data) => {
  const users = data.ch.count;
  const room = data.ch._id || data.ch.id;
  updateStatus(users, room);

  const usersArray = data.ppl;
  usersArray.forEach((user) => {
    namesdb.set(user._id, user.name);
  });
});

// Revolt client login
client.loginBot(process.env.RTOKEN);

// To keep bot running :)
process.on("uncaughtException", function (error) {
  console.log(error.stack);
});
