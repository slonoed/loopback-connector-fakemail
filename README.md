# loopback-connector-fakemail


Connector for loopback email model.
Save email data to `/tmp/fakemail/${Date.now()}.json`

## Usage
Install `npm i --save loopback-connector-fakemail`

Add to `server/datasources.json`

```
{
  ...
  "email": {
    "name": "email",
    "connector": "fakemail"
  },
  ...
```

# Dev plan

- [ ] __Change path by params__
- [ ] Build html preview
