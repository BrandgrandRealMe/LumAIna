const axios = require("axios");
const TOKEN = process.env.tinyUrlTOKEN;

async function isValidURL(url) {
  const urlPattern = new RegExp(
    "^ (https?:\\/\\/)?" + // protocol
      "(((a-z\\d*)\\.)+[a-z]{2,}|" + // domain name
      "((\\d{1,3}\\.){3}\\d{1,3}))" + // OR ip (v4) address
      "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" + // port and path
      "(\\?[;&a-z\\d%_.~+=-]*)?" + // query string
      "(\\#[-a-z\\d_]*)?$",
    "i"
  ); // fragment locator
  if (urlPattern.test(url)) {
    try {
      new URL(string);
      // If no error is thrown, the string is a valid URL
      return true;
    } catch (error) {
      // If an error is thrown, the string is not a valid URL
      return false;
    }
  } else {
    return false;
  }
}
async function shortenUrl(originalUrl) {
  if (!isValidURL(originalUrl)) return null;
  try {
    const response = await axios.post(
      `https://api.tinyurl.com/create?api_token=${TOKEN}`,
      {
        url: originalUrl,
        domain: "tinyurl.com",
      }
    );

    if (response.status === 200) {
      return response.data;
    } else {
      throw new Error(response.data.error || "Error shortening URL");
    }
  } catch (error) {
    throw new Error(error.response.data.error || "Failed to shorten URL");
  }
}
async function unshortenUrl(shortUrl) {
  let longUrl = "";
  if (!isValidURL(shortUrl)) return null;
  await axios.get(shortUrl, { maxRedirects: 0 }).catch((data) => {
    // Check if the error is a redirection error
    if (Math.trunc(data.response.status / 100) === 3) {
      // Get the Location header from the error response
      const longURL = data.response.headers;
      // Set the var to the value of the Location header
      longUrl = longURL.location;
    }
  });
  return longUrl;
}

module.exports = {
  shorten: shortenUrl,
  unshorten: unshortenUrl,
  isValidURL: isValidURL,
};
