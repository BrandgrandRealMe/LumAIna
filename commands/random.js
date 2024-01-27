const animal = require("@sefinek/random-animals");
const randomIPGenerator = require("random-ip-generator");

module.exports = {
  info: {
    name: "random",
    desc: "Get random stuff",
    usage: "Animal | Network",
    type: "fun",
    mode: "GLOBAL",
  },
  run: async function (cl, args, msg, sendmsg, hercai, Player, biosdb, log) {
    const sub = args[0] || null;
    const sub2 = args[1] || null;
    if (sub) {
      var subcommand = sub.toLowerCase();
    }
    if (sub2) {
      var subcommand2 = sub2.toLowerCase();
    }
    if (!subcommand) return sendmsg("Pick one: Animal or Network");
    if (subcommand === "animal") {
      if (!subcommand2)
        return sendmsg("Pick one: Cat, Dog, Fox, Fish, Alpaca, or Bird");
      if (subcommand2 === "cat") {
        const data = await animal.cat();
        sendmsg(data.message);
      } else if (subcommand2 === "dog") {
        const data = await animal.dog();
        sendmsg(data.message);
      } else if (subcommand2 === "fox") {
        const data = await animal.fox();
        sendmsg(data.message);
      } else if (subcommand2 === "fish") {
        const data = await animal.fish();
        sendmsg(data.message);
      } else if (subcommand2 === "alpaca") {
        const data = await animal.alpaca();
        sendmsg(data.message);
      } else if (subcommand2 === "bird") {
        const data = await animal.bird();
        sendmsg(data.message);
      } else {
        sendmsg("Pick one: Cat, Dog, Fox, Fish, Alpaca, or Bird");
      }
    } else if (subcommand === "network") {
      if (!subcommand2) return sendmsg("Pick one: IPv4, IPv6, or MAC");
      if (subcommand2 === "ipv4") {
        const randomIPv4 = randomIPGenerator.randomIpv4();
        sendmsg(`Random IPv4: ${randomIPv4}`);
      } else if (subcommand2 === "ipv6") {
        const randomIPv6 = randomIPGenerator.randomIpv6();
        sendmsg(`Random IPv6: ${randomIPv6}`);
      } else if (subcommand2 === "mac") {
        const mac = randomIPGenerator.randomMac();
        sendmsg(`Random MAC: ${mac}`);
      } else {
        sendmsg("Pick one: IPv4, IPv6, or MAC");
      }
    } else {
      sendmsg("Pick one: Animal or Network");
    }
  },
};
