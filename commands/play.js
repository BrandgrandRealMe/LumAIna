const fs = require("fs");
const https = require("https");

module.exports = {
  info: {
    name: "play",
    desc: "Play a MIDI file!",
    usage: "<MIDI url>",
    type: "owner",
    mode: "MPP",
  },
  run: async function (cl, args, msg, sendmsg, hercai, Player, db) {
    if (!msg) return sendmsg(`That is a MPP only command.`); // run Only in MPP
    const oid = "5866b0893c3480ff7289be46";
    const uid = msg.p._id;
    if (oid != uid)
      return sendmsg("You do not have perms to use this command!");

    const URL = args[0];
    const regex = /\.mid$|\.kar$|\.rmi$/i;
    const isMidi = regex.test(URL);
    if (!isMidi) return sendmsg("This is not a midi file!");
    const path = "./temp.mid";

    const file = fs.createWriteStream(path);

    const request = https.get(URL, (response) => {
      response.pipe(file);
    });

    request.on("error", (error) => {
      console.error(error);
    });

    file.on("error", (error) => {
      console.error(error);
      fs.unlink(path);
    });

    file.on("finish", () => {
      file.close();
      // if (Player.isPlaying()) return Player.stop();
      Player.loadFile(path);
      Player.play();
      sendmsg("Now playing! :)");
    });
  },
};
