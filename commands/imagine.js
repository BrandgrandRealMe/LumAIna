const fs = require("fs");
const axios = require("axios");
const imgbbUploader = require("imgbb-uploader");
const imgbbTOKEN = process.env.imgbbTOKEN;
const mtempy = require("mtempy");
const blacklist = require("../blacklist.json");

async function downloadImage(url, path) {
  const response = await axios({
    method: "GET",
    url: url,
    responseType: "stream",
  });

  response.data.pipe(fs.createWriteStream(path));

  return new Promise((resolve, reject) => {
    response.data.on("end", () => {
      resolve();
    });

    response.data.on("error", (err) => {
      reject(err);
    });
  });
}
async function uploadToImgbb(filePath, apiKey, Name) {
  const options = {
    apiKey: apiKey, // MANDATORY
    imagePath: filePath, // OPTIONAL: pass a local file (max 32Mb)
    name: Name, // OPTIONAL: pass a custom filename to imgBB API
  };

  return await imgbbUploader(options).catch((error) => console.error(error));
}
module.exports = {
  info: {
    name: "imagine",
    desc: "Generate AI images!",
    usage: "<prompt>",
    type: "fun",
    mode: "GLOBAL",
  },
  run: async function (cl, args, msg, sendmsg, hercai, Player, biosdb, log) {
    let id = "";
    if (msg.p) {
      id = msg.p._id;
    } else {
      id = msg.author.id;
    }
    if (blacklist.AI.includes(id))
      return sendmsg(
        "You can not use AI commands! You are blacklisted! Contact BrandgrandReal for any questions!"
      );
    if (args.length == 0) return sendmsg(`Usage: \`imagine <prompt>\``);
    hercai.drawImage({ prompt: args.join(" ") }).then(async (response) => {
      const tempUrl = response.url;
      if (!tempUrl) return sendmsg(`Error creating image :(`);

      const localFilePath = mtempy.file({ extension: "png" });
      //console.log(localFilePath);

      downloadImage(tempUrl, localFilePath)
        .then(async () => {
          const url = await uploadToImgbb(
            localFilePath,
            imgbbTOKEN,
            args.join(" ")
          );
          sendmsg(`Image Generated: \`${args.join(" ")}\` ${url.url}`);
        })
        .catch((err) => {
          console.error("Error:", err);
        });
    });
  },
};
