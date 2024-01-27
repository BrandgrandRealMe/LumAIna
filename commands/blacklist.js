module.exports = {
  info: {
    name: "blacklist",
    desc: "Blacklist someone!",
    usage: "remove <type> <ID> | add <type> <ID>",
    type: "owner",
    mode: "MPP",
  },
  run: async function (cl, args, msg, sendmsg, hercai, Player, biosdb, log, blacklistdb ) {
    if (!msg) return sendmsg(`That is a MPP only command.`); // run Only in MPP
    const oid = "5866b0893c3480ff7289be46";
    const uid = msg.p._id;
    if (oid != uid)
      return sendmsg("You do not have perms to use this command!");
    if (!args[0])
      return sendmsg("Usage: `remove <type> <ID> | add <type> <ID>`");
    if (args[0] == "remove") {
      if (!args[1]) return sendmsg("Usage: `remove <type> <ID>`");
      if (!args[2]) return sendmsg("Usage: `remove <type> <ID>`");
      if (args[1] == "ai") {
        blacklistdb.delete(args[2]);
        sendmsg(`Unblacklisted ${args[2]} from AI!`);
      } else if (args[1] == "global") {
        blacklistdb.delete(args[2]);
        sendmsg(`Unblacklisted ${args[2]} GLOBALY!`);
      }
    } else if (args[0] == "add") {
      if (!args[1]) return sendmsg("Usage: `add <type> <ID>`");
      if (!args[2]) return sendmsg("Usage: `add <type> <ID>`");
      if (args[1] == "ai") {
        blacklistdb.set(args[2], "ai");
        sendmsg(`Blacklisted ${args[2]} from AI!`);
      } else if (args[1] == "global") {
        blacklistdb.set(args[2], "global");
        sendmsg(`Blacklisted ${args[2]} GLOBALY!`);
      }
    }
  },
};
