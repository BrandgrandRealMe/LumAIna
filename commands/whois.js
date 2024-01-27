async function fetchUser(id) {
  const response = await fetch(
    `https://db.8448.space/api/?t=MPPC&p=${id}&id=exact`,
    {
      headers: {
        Accept: "application/json",
      },
    }
  );
  const data = response.json();
  return data;
}
module.exports = {
  info: {
    name: "whois",
    desc: "Get info on a user.",
    usage: "room <userID> | global <userID>",
    type: "util",
    mode: "MPP",
  },
  run: async function (cl, args, msg, sendmsg, hercai, Player, biosdb, log) {
    if (!msg) return sendmsg(`That is a MPP only command.`);
    if (args.length == 0)
      return sendmsg(
        `Usage: \`whois room <userID>\` | \`whois global <userID>\``
      );
    if (args[0] == "room") {
      const id = args[1] || msg.p._id;
      const info = cl.findParticipantById(id);
      sendmsg(
        `ID: \`${info._id}\` Name: \`${info.name}\` Color: \`${info.color}\` AFK?: \`${info.afk}\``
      );
    } else if (args[0] == "global") {
      const id = args[1] || msg.p._id;
      const info = await fetchUser(id);
      sendmsg(
        `ID: \`${info.a.i}\` Name: \`${info.a.n}\` Color: \`${info.a.c}\` Room: \`${info.a.r}\``
      );
    }
  },
};
