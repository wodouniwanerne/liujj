
/*按照星座对应数字
    0 —— 白羊座
    1 —— 金牛座
    2 —— 双子座
    3 —— 巨蟹座
    4 —— 狮子座
    5 —— 处女座
    6 —— 天秤座
    7 —— 天蝎座
    8 —— 射手座
    9 —— 摩羯座
    10 —— 水瓶座
    11 —— 双鱼座
*/


var fs = require('fs');


var WXBizMsgCrypt = require('wechat-crypto');
var WxMsg = require('wechat-msg-crypt');
var schedule = require('node-schedule');

var express = require('express');

var readData = require('./spider.js').readData;
var getToken = require('./token.js').getToken;
var replyText = require('./reply.js').replyText;
var createmenu = require('./menu.js').createmenu;

//日期格式化函数
function dateoff(date) {
    function dble(time) {
        lengthOfTime = time.toString().length;
        if (lengthOfTime == 1) {
            return "0" + time.toString();
        } else {
            return time.toString();
        }
    }
    var mm = date.getMonth() + 1;
    var datetime = date.getFullYear() + "-" + dble(mm) + "-" + dble(date.getDate());
    return datetime;
}



var app = express();

//设置周一到周日0点1分执行爬虫操作
var rule = new schedule.RecurrenceRule();
rule.dayOfWeek = [0, new schedule.Range(1, 6)];
rule.hour = 1;
rule.minute = 0;
var j = schedule.scheduleJob(rule, function () {
    for (i = 0; i < 12; i++) {
        readData(i);
    }
});

//创建一次后设置每一小时的第一分钟运行创建一次菜单
createmenu();

var rule = new schedule.RecurrenceRule();
rule.minute = 1;
var j = schedule.scheduleJob(rule, function(){
    createmenu();
});

/*
for (i = 0; i < 12; i++) {
    readData(i);
}*/

app.get('/', function (request, response) {
    var msg_signature = request.query.msg_signature;
    var timestamp = request.query.timestamp;
    var nonce = request.query.nonce;
    var echostr = request.query.echostr;
    var cryptor = new WXBizMsgCrypt('liujj', '4t538GLgyipwDSTexLruKlFJ7n5rW6U7rpyfYxrUxZd', 'wx1d3765eb45497a18');
    var s = cryptor.decrypt(echostr);
    response.send(s.message);
});

app.post('/', function (request, response) {
    var postdata = "";
    request.addListener("data", function (postchunk) {
        postdata += postchunk;
    });

    request.addListener("end", function () {
        var parseString = require('xml2js').parseString;
        parseString(postdata, function (err, result) {
            if (!err) {
                var cryptor = new WXBizMsgCrypt('liujj', '4t538GLgyipwDSTexLruKlFJ7n5rW6U7rpyfYxrUxZd', 'wx1d3765eb45497a18');
                var s = cryptor.decrypt(result.xml.Encrypt[0]);
                parseString(s.message, function (err, result) {
                    if (!err) {
                        var datetime = dateoff(new Date());
                        console.log(result);
                        if (result.xml.MsgType[0] == 'event') {
                            if (result.xml.EventKey[0] == 'yunshi') {
                                var res = replyText('回复星座获取运势', result.xml.ToUserName[0], result.xml.FromUserName[0]);
                                response.end(res);
                            }
                            if (result.xml.Event[0] == 'subcribe') {
                                var res = replyText('今日运势：感谢您的关注！', result.xml.ToUserName[0], result.xml.FromUserName[0]);
                                response.end(res);
                            }
                            if (result.xml.Event[0] == 'enter_agent') {
                                var res = replyText('暂时只能响应星座消息。回复星座查看今日运势', result.xml.ToUserName[0], result.xml.FromUserName[0]);
                                response.end(res);
                            }
                            
                        } else {
                            switch (result.xml.Content[0]) {
                            case '白羊座' :
                                fs.readFile('data/' + datetime + '-0' + '.json', {encoding:'utf-8'}, function (err, bytesRead) {
                                    if (err) {
                                        console.log(err);
                                    } else {
                                        var res = replyText(bytesRead, result.xml.ToUserName[0], result.xml.FromUserName[0]);
                                        response.end(res);
                                    }
                                });
                                break;
                            case '金牛座' :
                                fs.readFile('data/' + datetime + '-1' + '.json', {encoding:'utf-8'}, function (err, bytesRead) {
                                    if (err) {
                                        console.log(err);
                                    } else {
                                        var res = replyText(bytesRead, result.xml.ToUserName[0], result.xml.FromUserName[0]);
                                        response.end(res);
                                    }
                                });
                                break;

                            case '双子座' :
                                fs.readFile('data/' + datetime + '-2' + '.json', {encoding:'utf-8'}, function (err, bytesRead) {
                                    if (err) {
                                        console.log(err);
                                    } else {
                                        var res = replyText(bytesRead, result.xml.ToUserName[0], result.xml.FromUserName[0]);
                                        response.end(res);
                                    }
                                });
                                break;

                            case '巨蟹座' :
                                fs.readFile('data/' + datetime + '-3' + '.json', {encoding:'utf-8'}, function (err, bytesRead) {
                                    if (err) {
                                        console.log(err);
                                    } else {
                                        var res = replyText(bytesRead, result.xml.ToUserName[0], result.xml.FromUserName[0]);
                                        response.end(res);
                                    }
                                });
                                break;

                            case '狮子座' :
                                fs.readFile('data/' + datetime + '-4' + '.json', {encoding:'utf-8'}, function (err, bytesRead) {
                                    if (err) {
                                        console.log(err);
                                    } else {
                                        var res = replyText(bytesRead, result.xml.ToUserName[0], result.xml.FromUserName[0]);
                                        response.end(res);
                                    }
                                });
                                break;

                            case '处女座' :
                                fs.readFile('data/' + datetime + '-5' + '.json', {encoding:'utf-8'}, function (err, bytesRead) {
                                    if (err) {
                                        console.log(err);
                                    } else {
                                        var res = replyText(bytesRead, result.xml.ToUserName[0], result.xml.FromUserName[0]);
                                        response.end(res);
                                    }
                                });
                                break;

                            case '天秤座' :
                                fs.readFile('data/' + datetime + '-6' + '.json', {encoding:'utf-8'}, function (err, bytesRead) {
                                    if (err) {
                                        console.log(err);
                                    } else {
                                        var res = replyText(bytesRead, result.xml.ToUserName[0], result.xml.FromUserName[0]);
                                        response.end(res);
                                    }
                                });
                                break;

                            case '天蝎座' :
                                fs.readFile('data/' + datetime + '-7' + '.json', {encoding:'utf-8'}, function (err, bytesRead) {
                                    if (err) {
                                        console.log(err);
                                    } else {
                                        var res = replyText(bytesRead, result.xml.ToUserName[0], result.xml.FromUserName[0]);
                                        response.end(res);
                                    }
                                });
                                break;

                            case '射手座' :
                                fs.readFile('data/' + datetime + '-8' + '.json', {encoding:'utf-8'}, function (err, bytesRead) {
                                    if (err) {
                                        console.log(err);
                                    } else {
                                        var res = replyText(bytesRead, result.xml.ToUserName[0], result.xml.FromUserName[0]);
                                        response.end(res);
                                    }
                                });
                                break;

                            case '摩羯座' :
                                fs.readFile('data/' + datetime + '-9' + '.json', {encoding:'utf-8'}, function (err, bytesRead) {
                                    if (err) {
                                        console.log(err);
                                    } else {
                                        var res = replyText(bytesRead, result.xml.ToUserName[0], result.xml.FromUserName[0]);
                                        response.end(res);
                                    }
                                });
                                break;

                            case '水瓶座' :
                                fs.readFile('data/' + datetime + '-10' + '.json', {encoding:'utf-8'}, function (err, bytesRead) {
                                    if (err) {
                                        console.log(err);
                                    } else {
                                        var res = replyText(bytesRead, result.xml.ToUserName[0], result.xml.FromUserName[0]);
                                        response.end(res);
                                    }
                                });
                                break;

                            case '双鱼座' :
                                fs.readFile('data/' + datetime + '-11' + '.json', {encoding:'utf-8'}, function (err, bytesRead) {
                                    if (err) {
                                        console.log(err);
                                    } else {
                                        var res = replyText(bytesRead, result.xml.ToUserName[0], result.xml.FromUserName[0]);
                                        response.end(res);
                                    }
                                });
                                break;

                            default:
                                var res = replyText('抱歉，暂时只能响应星座消息。回复星座可看今日运势', result.xml.ToUserName[0], result.xml.FromUserName[0]);
                                response.end(res);
                        }
                        }
                        
                    }
                });
            }
        });
    });
});
app.listen(3005);
console.log("Wxserver running at port:3005!");
