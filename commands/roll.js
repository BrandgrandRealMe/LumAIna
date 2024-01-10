  module.exports = (cl, args, msg, sendmsg) => {
    if (!args[0]) return sendmsg("Please input a number.");
    if (args[0] < 0 || args[0] > 100) return sendmsg("Invalid number! Number must be between 0 and 100.");
    const randomNumber = Math.floor(Math.random() * args[0]) + 1;
        sendmsg(`You rolled a ${randomNumber}! 🎲`)
}