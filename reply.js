
var WXBizMsgCrypt = require('wechat-crypto');
var WxMsg = require('wechat-msg-crypt');

//回复消息
function replyText(content, tousername, fromusername) {
    var tmpl = require('tmpl');
    var replyTmpl = '<xml>' +
    '<ToUserName><![CDATA[{tousername}]]></ToUserName>' +
    '<FromUserName><![CDATA[{fromusername}]]></FromUserName>' + 
    '<CreateTime>{createtime}</CreateTime>' + 
    '<MsgType><![CDATA[{msgtype}]]></MsgType>' +
    '<Content><![CDATA[{content}]]></Content>' +
    '</xml>';

    function reply(content, fromusername, tousername) {
        var info = {};
        var type = 'text';
        info.content = content || '';
        info.msgtype = type;
        info.createtime = new Date().getTime();
        info.tousername = tousername;
        info.fromusername = fromusername;
        return tmpl(replyTmpl, {
            tousername: info.tousername,
            fromusername: info.fromusername,
            createtime: info.createtime,
            msgtype: info.msgtype,
            content: info.content
        });
    }
   
    var wrap = {};
    var cryptor = new WXBizMsgCrypt('liujj', '4t538GLgyipwDSTexLruKlFJ7n5rW6U7rpyfYxrUxZd', 'wx1d3765eb45497a18');
    var wx = new WxMsg('liujj', '4t538GLgyipwDSTexLruKlFJ7n5rW6U7rpyfYxrUxZd', 'wx1d3765eb45497a18');
    var msg = reply(content, tousername, fromusername);
    wrap.timestamp = new Date().getTime();
    wrap.nonce = parseInt((Math.random() * 100000000000), 10);
    wrap.encrypt = wx.encryptMsg(wrap.timestamp, wrap.nonce, msg);
    return wrap.encrypt;
}

module.exports = {
  replyText: replyText
};