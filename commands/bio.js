module.exports = {
  info: {
    name: "bio",
    desc: "Get someones bio",
    usage: "set <text> | get <userID>",
    type: "info",
    mode: "MPP",
  },
  run: async function (cl, args, msg, sendmsg, hercai, Player, db) {
    if (!msg) return sendmsg(`That is a MPP only command.`); // run Only in MPP
    const id = msg.p._id;
    const name = msg.p.name;
    if (args.length == 0)
      return sendmsg(`Usage: \`bio set <text>\` | \`//bio get <userID>\` `);
    if (args[0] == "set") {
      if (args.length < 2) return sendmsg(`Usage: \`bio set <text>\``);
      const Bio = args.slice(1).join(" ");
      const data = {
        name: name,
        Bio: Bio,
      };
      db.set(id, data);
      const bio = db.get(id);
      sendmsg(`Bio Set to: ${bio.Bio}`);
    } else if (args[0] == "get") {
      if (args.length < 2) {
        const data = db.get(id);
        if (!data) return sendmsg(`You don't have a bio. Set one with \`bio set <text>\``);
        sendmsg(`${data.name}'s Bio: ${data.Bio}`);
      } else if (args[1]) {
        const data = db.get(args[1]);
        if (!data) return sendmsg(`This ID does not have a bio.`);
        sendmsg(`${data.name}'s Bio: ${data.Bio}`);
      }
    }
  },
};
