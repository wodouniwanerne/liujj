#wechat-msg-crypt

```
wx = require 'wechat-msg-crypt'

wx = new WxMsg token, aesKey, appId

wx.decryptMsg msg_signature, timestamp, nonce, xml, (err, msg) ->
  assert.equal msg.ToUserName, 'gh_c6cd7f443d76'
  assert.equal msg.FromUserName, 'oZ9F-jsydU2FZRVDQMYZ8rV4hrOU'
  assert.equal msg.CreateTime, 1427612890
  assert.equal msg.MsgType, 'text'
  assert.equal msg.Content, 'dev'
  assert.equal msg.MsgId, '6131550674102361012'

wx.encryptMsg timestamp, nonce, msg
```

