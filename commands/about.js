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
      "An AI/multipurpose bot and Bridge between MPP and Revolt | Join the Revolt server! https://rvlt.gg/b4mp1jgX | It uses Hercai https://www.npmjs.com/package/hercai | All AI Generated images are found here https://lumaina.imgbb.com | Made by •BrandgrandReal•"
    );
  },
};
