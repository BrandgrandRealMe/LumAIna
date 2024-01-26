module.exports = {
  info: {
    name: "coinflip",
    desc: "Flip a coin!",
    usage: "",
    type: "fun",
    mode: "GLOBAL",
  },
  run: async function (cl, args, msg, sendmsg, hercai, Player, db) {
    let items = ["Heads", "Tails"];
    let random = items[Math.floor(Math.random() * items.length)];
    sendmsg(`You got ${random}!`);
  },
};
