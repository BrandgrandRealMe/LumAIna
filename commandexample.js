module.exports = {
  info: { name: "cmd", desc: "Desc", usage: "cmd", type: "example", mode: "GLOBAL | MPP | REVOLT" },
  run: async function (cl, args, msg, sendmsg, hercai, Player, db, log) {
    sendmsg(msg);
  },
};
