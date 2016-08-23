'use strict'

var path = require('path')
var util = require('./libs/util')
var wechat_file = path.join(__dirname, './config/wechat.txt')



var config = {
	wechat: {
		appID: "wxc7b387c12e579e23",//wxb721f1c6efe95808", 
		appSecret: "aeb0106173029c28afdb6fdcf82c19f9",//"74bbbc5dc970f0ec579c544916b22584",
		token: "pflnhstudynodejs",//"pflnhcodingteachingresearching12",
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