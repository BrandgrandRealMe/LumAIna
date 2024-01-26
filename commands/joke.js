var oneLinerJoke = require("one-liner-joke");
module.exports = {
  info: {
    name: "joke",
    desc: "Get a random Joke!",
    usage: "",
    type: "fun",
    mode: "GLOBAL",
  },
  run: async function (cl, args, msg, sendmsg, hercai, Player, db) {
    var getRandomJoke = oneLinerJoke.getRandomJoke();
    var joke = getRandomJoke.body;
    sendmsg(joke);
  },
};
