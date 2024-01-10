const fs = require("fs");
const axios = require("axios");
const imgbbUploader = require("imgbb-uploader");
const imgbbTOKEN = process.env.imgbbTOKEN;


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
async function uploadToImgbb(filePath, apiKey) {
  return await imgbbUploader(apiKey, filePath).catch((error) =>
    console.error(error)
  );
}
module.exports = (cl, args, msg, sendmsg, hercai) => {
  hercai.drawImage({ prompt: args.join(" ") }).then(async (response) => {
    const tempUrl = response.url;
    if (!tempUrl) return sendmsg(`Error creating image :(`);
    const localFilePath = "temp.png";

    downloadImage(tempUrl, localFilePath)
      .then(async () => {
        const url = await uploadToImgbb(localFilePath, imgbbTOKEN);
        sendmsg(`Image Generated: \`${args.join(" ")}\` ${url.url}`);
      })
      .catch((err) => {
        console.error("Error:", err);
      });
  });
};
