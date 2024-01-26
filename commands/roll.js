module.exports = {
  info: {
    name: "roll",
    desc: "Roll A Die",
    usage: "<6-100>",
    type: "fun",
    mode: "GLOBAL",
  },
  run: async function (cl, args, msg, sendmsg, hercai, Player, db) {
    if (!args[0]) return sendmsg("Please input a number between 6 and 100");
    if (args[0] < 6 || args[0] > 100)
      return sendmsg("Invalid number! Number must be between 6 and 100.");
    const randomNumber = Math.floor(Math.random() * args[0]) + 1;
    sendmsg(`You rolled a ${randomNumber}! 🎲`);
  },
};
