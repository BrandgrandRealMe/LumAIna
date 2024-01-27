const urlutils = require("../urlutils.js");
module.exports = {
  info: {
    name: "url",
    desc: "Do things with a URL.",
    usage: "shorten <url> | expand <url>",
    type: "util",
    mode: "GLOBAL",
  },
  run: async function (cl, args, msg, sendmsg, hercai, Player, biosdb, log) {
    if (!args[0]) return sendmsg("Usage: `shorten <url> | expand <url>`");
    if (args[0] == "shorten") {
      const longurl = args[1];
      if (!urlutils.isValidURL(longurl)) return sendmsg("Invalid URL.");
      const shorturl = await urlutils.shorten(longurl);
      sendmsg(`Shortened URL: ${shorturl.data.tiny_url}`);
    } else if (args[0] == "unshorten" || args[0] == "expand") {
      const shorturl = args[1];
      if (!urlutils.isValidURL(shorturl)) return sendmsg("Invalid URL.");
      const longurl = await urlutils.unshorten(shorturl);
      sendmsg(`Expanded URL: ${longurl}`);
    }
  },
};
