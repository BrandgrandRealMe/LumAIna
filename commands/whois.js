  module.exports = (cl, args, msg, sendmsg) => {
    if (!msg) return sendmsg(`That is a MPP only command.`);
    const id = msg.p._id;
    const uname = msg.p.name;
    const color = msg.p.color;
        sendmsg(`Name: \`${uname}\`, Color: \`${color}\`, ID: \`${id}\``)
}
