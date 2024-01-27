module.exports = {
  info: {
    name: "ping",
    desc: "Check if the bot is working!",
    usage: "",
    type: "debug",
    mode: "GLOBAL",
  },
  run: async function (cl, args, msg, sendmsg, hercai, Player, biosdb, log) {
    sendmsg("pong!");
  },
};
