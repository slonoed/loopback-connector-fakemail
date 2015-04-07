# loopback-connector-fakemail

[![Join the chat at https://gitter.im/SLonoed/loopback-connector-fakemail](https://badges.gitter.im/Join%20Chat.svg)](https://gitter.im/SLonoed/loopback-connector-fakemail?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)


Connector for loopback email model.
Save email data to json files and in single index.html file.

## Usage
Install `npm i --save loopback-connector-fakemail`

Add to `server/datasources.json`

```
{
  ...
  "email": {
    "name": "email",
    "connector": "fakemail",
    "path": "/tmp/fakemails"
  },
  ...
```

## Params
### Path
**Absolute** path to store emails. Default to `/tmp/fakemails/`

You can use `datasources.local.js` like this.

```
import { join } from 'path';

module.exports = {
    email: {
        name: 'email',
        connector: 'fakemail',
        path: join(__dirname, '../fake-emails')
    }
};
```
