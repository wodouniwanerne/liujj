var needle = require('needle');


var getToken = require('./token.js').getToken;

function createmenu() {
	//创建菜单
	var menu = {
		"button":[
        	{	
            	"type":"click",
            	"name":"今日运势",
            	"key":"yunshi"
        	}
    	]
	}

	var params = JSON.stringify(menu);
	var option = {};
	getToken().then(function (res) {
		var token = res.access_token;
		needle.post('https://qyapi.weixin.qq.com/cgi-bin/menu/create?access_token='+ token +'&agentid=56', params, option, function (err, res) {
			console.log('set menu');
		});
	});
}

module.exports = {
  createmenu: createmenu
};