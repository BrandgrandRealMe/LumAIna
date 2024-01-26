module.exports = {
  info: {
    name: "roominfo",
    desc: "Get info for the room.",
    usage: "",
    type: "util",
    mode: "GLOBAL",
  },
  run: async function (cl, args, msg, sendmsg, hercai, Player, db) {
    const players = Object.keys(cl.ppl).length;
    const cname = cl.channel.id;
    const color = {
      color: cl.channel.settings.color,
      color2: cl.channel.settings.color2,
    };
    sendmsg(
      `Room: ${cname} Colors: \`${color.color}\`, \`${color.color2}\` Players: \`${players}\``
    );
  },
};
