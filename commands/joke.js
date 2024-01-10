var oneLinerJoke = require("one-liner-joke");
module.exports = (cl, args, msg, sendmsg) => {
  var getRandomJoke = oneLinerJoke.getRandomJoke();
  var joke = getRandomJoke.body;
  sendmsg(joke);
};
