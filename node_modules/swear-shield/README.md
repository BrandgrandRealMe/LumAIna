# Swear Shield
![version](https://img.shields.io/npm/v/swear-shield.svg)
![downloads](https://img.shields.io/npm/dm/swear-shield.svg)
![CI/CD](https://github.com/EpiXCoder/ACS3310-SwearShield/actions/workflows/node.js.yml/badge.svg)

In the era of social media, trolls and negativity can often overshadow the benefits of open communication. Harsh words or profanity can turn any constructive conversation into a hostile environment. This is where our Swear Shield Node.js module comes in handy. Designed to sanitize user-generated content, it helps to maintain the quality and decency of discussions by filtering out offensive words.

Built for flexibility, this module allows you to use a default list of profane words or define a custom list based on your needs. Regardless of where the offending words appear, our filter can identify and replace them, ensuring a safer and more respectful social platform.

Easy to integrate and use, this module is a valuable addition to any project that values positive and respectful communication. Remember, the pen is mightier than the sword, and with our profanity filter, we can ensure it's also more polite."

Remember, the exact wording can be adjusted based on your understanding of the module's functionality and your project's tone and style.

[NPM package available here.](https://www.npmjs.com/package/swear-shield)

## Installation
```javascript
npm install swear-shield
```

## Usage

### Basic Usage with Default Profanity List:
```javascript
const { SwearShield } = require('swear-shield');
const filter = new SwearShield();

const userInput = "This is a test sentence with badword.";
console.log(filter.sanitize(userInput)); // "This is a test sentence with *******."
```

### Using Custom Profanity List:
```javascript
const customList = ["customword1", "customword2"];
const filter = new SwearShield('*', customList);

const userInput = "This sentence has customword1 in it.";
console.log(filter.sanitize(userInput)); // "This sentence has ********** in it."

```

### Excluding Specific Words from Being Filtered:
```javascript
filter.removeWords("customword1");
const userInput = "This sentence has customword1 in it.";
console.log(filter.sanitize(userInput)); // The output remains unchanged

```

### Adding New Words to the Filter:
```javascript
filter.addWords("newbadword");
const userInput = "Here is another sentence with newbadword.";
console.log(filter.sanitize(userInput)); // "Here is another sentence with *********."

```
