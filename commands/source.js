module.exports = {
  info: {
    name: "source",
    desc: "Get my source code.",
    usage: "",
    type: "info",
    mode: "GLOBAL",
  },
  run: async function (cl, args, msg, sendmsg, hercai, Player, biosdb, log) {
    sendmsg(
      "The source code is available on Github: https://github.com/BrandgrandRealMe/LumAIna"
    );
  },
};
