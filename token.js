var fs = require('fs');
var https = require('https');


//获取token，并通过文件存储
function getToken() {
	return new Promise(function(resolve, reject) {
		var token;
		//先看是否有token缓存，这里用文件缓存
		if (fs.existsSync('token.dat')) {
			token = JSON.parse(fs.readFileSync('token.dat'));
		}

		//如果没有缓存或者过期
		if (!token || token.timeout < Date.now()) {
			https.get("https://qyapi.weixin.qq.com/cgi-bin/gettoken?corpid=wx1d3765eb45497a18&corpsecret=_3YZFSVVIi-yZmLmrVnveBai6kTg8BloiXHLYu4ORDSGETtaN_rlnhkP8Qi_uozB", function(res) {
				var html = ''; // 保存抓取
   				res.setEncoding('utf-8');
    			// 抓取页面内容
    			res.on('data', function(chunk) {
        			html += chunk;
    			});

    			//网页内容抓取完毕
    			res.on('end', function() {
    				var result = JSON.parse(html);
    				result.timeout = Date.now() + 7000000;
    				//更新token并缓存
        			console.log(result);
    				fs.writeFileSync('token.dat', JSON.stringify(result));
    				resolve(result);
    			});
    			
    		}).on('error', function(err) {
    			console.log(err);
    		});
		} else {
			resolve(token);
		}
	});
}

module.exports = {
  getToken: getToken
};