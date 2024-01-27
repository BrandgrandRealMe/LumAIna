async function fetchJoke() {
  const response = await fetch("http://icanhazdadjoke.com", {
    headers: {
      Accept: "application/json",
    },
  });
  const data = response.json();
  return data;
}
module.exports = {
  info: {
    name: "dadjoke",
    desc: "Get a random dadjoke!",
    usage: "",
    type: "fun",
    mode: "GLOBAL",
  },
  run: async function (cl, args, msg, sendmsg, hercai, Player, biosdb, log) {
    const { joke } = await fetchJoke();
    sendmsg(`Dad: ${joke}`);
  },
};
