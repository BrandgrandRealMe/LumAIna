// Betterlogs 
const ver = "1.0.0 BETA";
const debugON = false;

// Load Dependencies
var colors = require('colors/safe');
const { Webhook, MessageBuilder } = require('discord-webhook-node');
const fs = require('fs');
const path = require('path');

// setup Colors 
colors.setTheme({
  silly: 'rainbow',
  verbose: 'cyan',
  info: 'green',
  data: 'grey',
  help: 'cyan',
  warn: 'brightYellow',
  debug: 'blue',
  server: 'brightBlue',
  error: 'red',
  black: 'darkGrey',
})

// functions

function padcenter(t, l) {
  let leftPad = (l - t.length) / 2;
  let rightPad = l - t.length - leftPad;
  return " ".repeat(leftPad) + t + " ".repeat(rightPad);
}




// options
function handleOptions(options = {}) {
  const defaultOptions = {
    webhook: 'false',
    logfolder: 'false',
  };
  return { ...defaultOptions, ...options };
}




// myModule.js
module.exports = function myModule(options = {}) {
  const date = new Date();
  const opts = handleOptions(options);

  // functions
  function GetFileLog(f) {
    // Logging to file

    const logFolder = f;
    const logFileName = new Date().toLocaleDateString().replace(/\//g, '-') + '_log' + '.txt';


    if (!fs.existsSync(logFolder)) {
      fs.mkdirSync(logFolder);
    }
    return path.join(logFolder, logFileName);
  }
  function flog(m, t) {
    let f = GetFileLog(opts.logfolder)
    let date = new Date();
    let time = date.toLocaleTimeString()
    let pd = padcenter(time, 12);
    let pt = padcenter(t, 10);
    if (debugON) { // true = debug
      console.log(m, t);
    }
    fs.appendFile(f, `${pd}|${pt}| ${m}\n`, (err) => {
      if (err) throw err;
    });
  }
  console.log(colors.info(`BetterDevLogs ${ver} | `) + `Successfuly Loaded! \n` + colors.debug(`Made By CYBRΞRLabs`));

  if (opts.logfolder !== "false") {

    flog(`BetterDevLogs v${ver} - Log Started! ${date.toLocaleDateString()} ${date.toLocaleTimeString()}`, `Logger`);
  }
  let dlog;
  if (opts.webhook !== "false") {
    // Setup Webhook
    dlog = new Webhook(opts.webhook);
    dlog.setUsername('BetterDevLogs v' + ver);
    dlog.success('**BetterDevLogs**', 'Successfuly Loaded!', `BetterDevLogs Made By CYBRΞRLabs`);

  }

  return {

    silly: (msg) => {

      let name = "Silly";
      let icon = "😋";
      let color = "#f8a532";

      console.log(colors.silly(`${name} | `) + msg);

      if (opts.webhook !== "false") {
        const embed = new MessageBuilder() // Create Styled embed
          .setTitle(icon + " " + name)
          .setColor(color)
          .setDescription(msg)
        dlog.send(embed); // send embed to webhook
      }
      if (opts.logfolder !== "false") {
        flog(msg, icon + " " + name);
      }


    },
    verbose: (msg) => {

      let name = "Verbose";
      let icon = "💬";
      let color = "#1285b0";

      console.log(colors.verbose(`${name} | `) + msg);

      if (opts.webhook !== "false") {
        const embed = new MessageBuilder() // Create Styled embed
          .setTitle(icon + " " + name)
          .setColor(color)
          .setDescription(msg)
        dlog.send(embed); // send embed to webhook
      }
      if (opts.logfolder !== "false") {
        flog(msg, icon + " " + name);
      }


    },
    info: (msg) => {

      let name = "Info";
      let icon = "ℹ️";
      let color = "#009126";

      console.log(colors.info(`${name} | `) + msg);

      if (opts.webhook !== "false") {
        const embed = new MessageBuilder() // Create Styled embed
          .setTitle(icon + " " + name)
          .setColor(color)
          .setDescription(msg)
        dlog.send(embed); // send embed to webhook
      }
      if (opts.logfolder !== "false") {
        flog(msg, icon + " " + name);
      }


    },
    data: (msg) => {

      let name = "Data";
      let icon = "📜";
      let color = "#435569";

      console.log(colors.silly(`${name} | `) + msg);

      if (opts.webhook !== "false") {
        const embed = new MessageBuilder() // Create Styled embed
          .setTitle(icon + " " + name)
          .setColor(color)
          .setDescription(msg)
        dlog.send(embed); // send embed to webhook
      }
      if (opts.logfolder !== "false") {
        flog(msg, icon + " " + name);
      }


    },
    help: (msg) => {

      let name = "Help";
      let icon = "🆘";
      let color = "#0093b0";

      console.log(colors.help(`${name} | `) + msg);

      if (opts.webhook !== "false") {
        const embed = new MessageBuilder() // Create Styled embed
          .setTitle(icon + " " + name)
          .setColor(color)
          .setDescription(msg)
        dlog.send(embed); // send embed to webhook
      }
      if (opts.logfolder !== "false") {
        flog(msg, icon + " " + name);
      }


    },
    warn: (msg) => {

      let name = "Warning";
      let icon = "⚠️";
      let color = "#FFFF00";

      console.log(colors.warn(`${name} | `) + msg);

      if (opts.webhook !== "false") {
        const embed = new MessageBuilder() // Create Styled embed
          .setTitle(icon + " " + name)
          .setColor(color)
          .setDescription(msg)
        dlog.send(embed); // send embed to webhook
      }
      if (opts.logfolder !== "false") {
        flog(msg, icon + " " + name);
      }


    },
    debug: (msg) => {

      let name = "Debug";
      let icon = "⚒️";
      let color = "#237cf2";

      console.log(colors.debug(`${name} | `) + msg);

      if (opts.webhook !== "false") {
        const embed = new MessageBuilder() // Create Styled embed
          .setTitle(icon + " " + name)
          .setColor(color)
          .setDescription(msg)
        dlog.send(embed); // send embed to webhook
      }
      if (opts.logfolder !== "false") {
        flog(msg, icon + " " + name);
      }


    },
    error: (msg) => {

      let name = "Error";
      let icon = "⚠️";
      let color = "#ff5b4a";

      console.log(colors.error(`${name} | `) + msg);

      if (opts.webhook !== "false") {
        const embed = new MessageBuilder() // Create Styled embed
          .setTitle(icon + " " + name)
          .setColor(color)
          .setDescription(msg)
        dlog.send(embed); // send embed to webhook
      }
      if (opts.logfolder !== "false") {
        flog(msg, icon + " " + name);
      }


    },
    server: (msg) => {

      let name = "Server";
      let icon = "🖥️";
      let color = "#41a5f2";

      console.log(colors.server(`${name} | `) + msg);

      if (opts.webhook !== "false") {
        const embed = new MessageBuilder() // Create Styled embed
          .setTitle(icon + " " + name)
          .setColor(color)
          .setDescription(msg)
        dlog.send(embed); // send embed to webhook
      }
      if (opts.logfolder !== "false") {
        flog(msg, icon + " " + name);
      }


    },
    quiet: (msg) => {

      let name = "Quiet";
      let icon = "⚫";
      let color = "#000000";

      console.log(colors.black(`${name} | `) + msg);

      if (opts.webhook !== "false") {
        const embed = new MessageBuilder() // Create Styled embed
          .setTitle(icon + " " + name)
          .setColor(color)
          .setDescription(msg)
        dlog.send(embed); // send embed to webhook
      }
      if (opts.logfolder !== "false") {
        flog(msg, icon + " " + name);
      }


    },
  };
};
