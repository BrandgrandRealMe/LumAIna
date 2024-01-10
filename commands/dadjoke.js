async function fetchJoke() {
  const response = await fetch("http://icanhazdadjoke.com", {
    headers: {
      Accept: "application/json",
    },
  });
  const data = response.json();
  return data;
}

module.exports = async (cl, args, msg, sendmsg) => {
  const { joke } = await fetchJoke();
  sendmsg(`Dad: ${joke}`);
};
