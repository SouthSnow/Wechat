'use-strict'
var Promise = require('bluebird');
var request = Promise.promisify(require('request'));


var menu = {
	'button': [
		{
			name: '最新信息',
			sub_button: [
				{
					type: 'view',
					name: 'code必杀技',
					url: 'https://www.baidu.com'
				},
				{
					type: 'view',
					name: '科技动态',
					url: 'https://www.baidu.com'
				},
				{
					type: 'view',
					name: '健康生活',
					url: 'https://www.baidu.com'
				},
				{
					type: 'view',
					name: '职业规划',
					url: 'https://www.baidu.com'
				},
			]
		},
		{
			name: '其他资讯',
			sub_button: [
				{
					type: 'view',
					name: '科技',
					url: 'https://www.baidu.com'
				},
				{
					type: 'view',
					name: '时尚',
					url: 'https://www.baidu.com'
				},
				{
					type: 'view',
					name: '汽车',
					url: 'https://www.baidu.com'
				},
				{
					type: 'view',
					name: '理财',
					url: 'https://www.baidu.com'
				},
			]
		},
		{
			name: '关于我',
			type: 'view',
			url: 'https://www.baidu.com'
		}
	]
}

exports.createMenu = function (accessToken) {
	var url = ' https://api.weixin.qq.com/cgi-bin/menu/create?access_token=' + accessToken;
	request({method:'POST', url: url, formData: menu, json:true})
	.then(function (data) {
		console.log('createMenu data: ', JSON.JSON.stringify(data));
	})
}








