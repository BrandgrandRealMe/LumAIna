# mppclone-client

This module is a fork of the [MPP client](https://github.com/brandon-lockby/mpp-client) with token-based authentication. This module is only meant for [MPPClone](https://mppclone.com), but it will work on any MPP site that uses token-based authentication in the same way as MPPClone.

This module is not officially affiliated with MPPClone.

## Usage

It is strongly recommended that you keep your tokens in a safe place where nobody else can access them.

```env
# .env
TOKEN=your token here
```

```js
// index.js

// Load environment variables into process.env
require('dotenv').config();

const Client = require('mppclone-client');
let cl = new Client("wss://mppclone.com:8443", process.env.TOKEN);

cl.start();
cl.setChannel('test/awkward');

cl.on('a', msg => {
    if (msg.a == "!ping") {
        cl.sendArray([{
            m: "a",
            message: "Pong!"
        }]);
    }
});
```

## Links

- [MPPClone frontend source](https://github.com/LapisHusky/mppclone)
- [MPP client source](https://github.com/brandon-lockby/mpp-client)
