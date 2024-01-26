module.exports = {
  info: {
    name: "about",
    desc: "Get a link to the Github.",
    usage: "",
    type: "info",
    mode: "GLOBAL",
  },
  run: async function (cl, args, msg, sendmsg, hercai, Player, db) {
    sendmsg(
      "The source code is available on Github: https://github.com/BrandgrandRealMe/LumAIna"
    );
  },
};
