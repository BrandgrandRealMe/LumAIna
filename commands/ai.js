const { SwearShield } = require("swear-shield");
const filter = new SwearShield();

function truncate(str, n, useWordBoundary) {
  if (str.length <= n) {
    return str;
  }
  const subString = str.slice(0, n - 1); // the original check
  return (
    (useWordBoundary
      ? subString.slice(0, subString.lastIndexOf(" "))
      : subString) + "…"
  );
}
module.exports = {
  info: {
    name: "ai",
    desc: "Ask AI something!",
    usage: "<prompt>",
    type: "fun",
    mode: "GLOBAL",
  },
  run: async function (cl, args, msg, sendmsg, hercai, Player, db) {
    if (args.length == 0) return sendmsg(`Usage: \`ai <prompt>\``);
    hercai
      .question({
        content:
          "Your name is LumAIna, Reply in under 512 characters: " +
          args.join(" "),
      })
      .then((response) => {
        sendmsg(truncate(filter.sanitize(response.reply), 512, true));
      })
      .catch((err) => {
        console.error("Error:", err);
      });
  },
};
