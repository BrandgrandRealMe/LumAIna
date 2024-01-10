module.exports = (cl, args, msg, sendmsg) => {
  let items = ["Heads", "Tails"];
  let random = items[Math.floor(Math.random() * items.length)];
  sendmsg(`You got ${random}!`);
};
