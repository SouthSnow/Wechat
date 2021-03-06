'use strict'


var menu = require('../menu/menu');
var Promise = require('bluebird')
var request = Promise.promisify(require('request'))
var util = require('./util')
var fs = require('fs')
var prefix = 'https://api.weixin.qq.com/cgi-bin/'
var api = {
	accesstoken: prefix + "token?grant_type=client_credential",
	upload: prefix + "media/upload?"
}

function Wechat(opts) {
	var that = this
	this.appID = opts.appID
	this.appSecret = opts.appSecret
	this.getAccessToken = opts.getAccessToken
	this.saveAccessToken = opts.saveAccessToken

	this.fetchAccessToke()
	.then(function (data) {
		// menu.createMenu(data.access_token);
	});
}


Wechat.prototype.fetchAccessToke = function () {
		
	var that = this

	if (this.access_token && this.expires_in) {
		if (this.isValidAccessToken(this)) {
			return Promise.resolve(this)
		}
	}

	return this.getAccessToken()
		.then(function (data) {
			try {
				data = JSON.parse(data)
			}
			catch(e) {
				return that.updateAccessToken()
			}
			// 验证票据的有效性
			if (that.isValidAccessToken(data)) {
				return Promise.resolve(data)
			}
			else {
				return that.updateAccessToken()
			}
		})
		.then(function (data) {
			that.access_token = data.access_token
			that.expires_in = data.expires_in
			that.saveAccessToken(data)
			return Promise.resolve(data)
		})

}

Wechat.prototype.isValidAccessToken = function(data) {
	if (!data || !data.access_token || !data.expires_in) {
		return false
	}

	var access_token = data.access_token
	var expires_in = data.expires_in
	var now = (new Date().getTime())

	if (now < expires_in) {
		return true
	}
	return false
}

// 类似oc的category : 原型链新增接口
Wechat.prototype.updateAccessToken = function () {
	var appID = this.appID
	var appSecret = this.appSecret
	var url = api.accesstoken + "&appid=" + appID + '&secret=' + appSecret


	return new Promise(function (resolve, reject) {
		request({url: url, json: true}).then(function (response) {
			var data = response.body
			var now = (new Date().getTime())
			var expires_in = now + (data.expires_in - 20) * 1000
			data.expires_in = expires_in
			resolve(data)
		})
	})
}


// 类似oc的category : 原型链新增接口
Wechat.prototype.uploadMaterial = function (type,filepath) {
	var that = this
	var form = {
		media: fs.createReadStream(filepath)
	}

	var appID = this.appID
	var appSecret = this.appSecret

	return new Promise(function (resolve, reject) {
		that.fetchAccessToke()
		.then(function (data) {
			console.log('token data: ', JSON.stringify(data));
			var url = api.upload + 'access_token=' + data.access_token + '&type=' + type
			request({method: 'POST', url: url, formData: form, json: true}).then(function (response) {
				var _data = response.body
				if (_data) {
					resolve(_data)
				}
				else {
					throw new Error('upload material fail')
				}
			})
		.catch(function (e) {
			reject(e)
		})
		})	
	})
}


Wechat.prototype.reply = function() {
	var content = this.body
	var message = this.weixin
	var xml = util.tpl(content, message)
    console.log('wechat.reply message: ', message)
    console.log('wechat.reply content: ', content)
    console.log('wechat.reply xml: ', xml)

	this.status = 200
	this.type = 'application/xml'
	this.body = xml
}


module.exports = Wechat







