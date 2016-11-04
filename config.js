'use strict'

var path = require('path')
var util = require('./libs/util')
var wechat_file = path.join(__dirname, './config/wechat.txt')



var config = {
	wechat: {
		appID: "wxb721f1c6efe95808", 
		appSecret: "74bbbc5dc970f0ec579c544916b22584",
		token: "weixin1984",
		getAccessToken: function () {
			return util.readFileAsync(wechat_file)
		},
		saveAccessToken: function (data) {
			data = JSON.stringify(data)
			return util.writeFileAsync(wechat_file, data)
		}

	}
}

module.exports = config
