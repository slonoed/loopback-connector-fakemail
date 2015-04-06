# loopback-connector-fakemail


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
