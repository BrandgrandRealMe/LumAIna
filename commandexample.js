module.exports = {
  info: { name: "cmd", desc: "Desc", usage: "cmd", type: "example", mode: "GLOBAL | MPP | REVOLT" },
  run: async function (cl, args, msg, sendmsg, hercai, Player, biosdb, log, blacklistdb) {
    sendmsg(msg);
  },
};
