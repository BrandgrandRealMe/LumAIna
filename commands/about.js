module.exports = {
  info: {
    name: "about",
    desc: "Get info about the bot.",
    usage: "",
    type: "info",
    mode: "GLOBAL",
  },
  run: async function (cl, args, msg, sendmsg, hercai, Player, db) {
    sendmsg(
      "An AI bot and Bridge to Revolt | https://rvlt.gg/b4mp1jgX | It uses Hercai https://www.npmjs.com/package/hercai | All AI Images Found Here https://lumaina.imgbb.com | Made By •BrandgrandReal•"
    );
  },
};
