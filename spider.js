var http = require('http');
var fs = require('fs');
var cheerio = require('cheerio');

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

//读取相关页面链接，并获得该星座的运势内容
var readData = function (num) {
	http.get("http://www.meiguoshenpo.com/meiri/", function (res) {
		var html = '';   //保存抓取到的html源码
		var links = [];   //保存解析HTML后的数据
		res.setEncoding('utf-8');

		//抓取页面内容
		res.on('data', function (chunk) {
			html += chunk;
		});

		//网页内容抓取完毕
		res.on('end', function () {
			//console.log(html);
			var $ = cheerio.load(html);
			$('div.list_item').eq(num).each(function (index, item) {
				var url = $('a', this).attr('href');
				http.get(url, function (res) {
					var html = '';
					
					res.setEncoding('utf-8');

					res.on('data', function (chunk) {
						html += chunk;
					});

					res.on('end', function () {
						var $ = cheerio.load(html);
						$('div.show_cnt p').eq(1).each(function (index, item) {
							datetime = dateoff(new Date());
							var x = $(this).text();	
							var y = '';
							for (i = 0; i < 4; i++) {
								var arr = x.substring(i * 13, 13 * (i + 1));
								var y = y + arr + '\n';				
							}
							$('div.show_cnt p').eq(2).each(function (index, item) {
								var x = $(this).text();	
								var arr = x.substring(0, 4);
								y = y + '\n' + arr + ':\n';				
								var arr = x.substring(4);
								y = y + arr + '\n\n';
       							$('div.show_cnt p').eq(4).each(function (index, item) {
									var x = $(this).text();	
									var arr = x.substring(0, 6);
									y = y + arr + ':\n';				
									var arr = x.substring(6);
									y = y + arr + '\n';
									fs.appendFile('data/' + datetime + '-' + num + '.json', y, function (err) {
            							if (err) {
                							console.log(err);
            							}
       								});
								});
							});
						});
						
					});
				});
			});
		});
	}).on('error', function (err) {
		console.log(err);
	});		
}


module.exports = {
  readData: readData
};