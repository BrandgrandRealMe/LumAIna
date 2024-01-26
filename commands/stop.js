module.exports = {
  info: {
    name: "stop",
    desc: "Stops the current song.",
    usage: "",
    type: "owner",
    mode: "MPP",
  },
  run: async function (cl, args, msg, sendmsg, hercai, Player, db) {
    if (!msg) return sendmsg(`That is a MPP only command.`); // run Only in MPP
    const oid = "5866b0893c3480ff7289be46";
    const uid = msg.p._id;
    if (oid != uid)
      return sendmsg("You do not have perms to use this command!");
    if (Player.isPlaying()) {
      Player.stop();
      sendmsg("Music Should Be Stopped! ):");
    } else {
      sendmsg("Nothing is playing! O:");
    }
  },
};
