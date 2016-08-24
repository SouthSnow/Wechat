'use strict'
var config = require('./config')
var Wechat = require('./wechat/wechat')
var wechatApi = new Wechat(config.wechat)

exports.reply = function *(next) {
	var message = this.weixin

	// console.log('您上报的地理位置是:')
	this.body = "您上报的地理位置是: " + message.Latitude + '/' + message.Longitude + '_' + message.Precision
	if (message.MsgType === 'event') {

			console.log('事件名称:' + message.Event)

		if (message.Event === 'subscribe') {
			if (message.EventKey) {
				console.log('扫二维码进来: ' + message.EventKey + ' ' + message.
					Ticket)
			}
			this.body = '哈哈, 你订阅了这个号\r\n' + '消息ID:' + message.MsgId
		}
		else if (message.Event === 'unsubscribe') {
			console.log('无情取关')
		}
		else if (message.Event === 'LOCATION') {
			this.body = "您上报的地理位置是: " + message.Latitude + '/' + message.Longitude + '_' + message.Precision
		}
		else if (message.Event === 'CLICK') {
			this.body = "您点击了菜单: " + message.EventKey 
		}
		else if (message.Event === 'SCAN') {
			this.body = "看到我扫一扫: " + message.EventKey + ' ' + message.Ticket
		}
		else if (message.Event === 'VIEW') {
			this.body = "您点击了链接: " + message.EventKey
		}
	}
	else if (message.MsgType === "text") {
		var content = message.Content
		var reply = "你说的太复杂了, 我听不懂"	
		if (content === "1") {
			reply = "天下第一吃大米"
		}
		else if (content === "2") {
			reply = "天下第二吃豆腐"
		}
		else if (content === "3") {
			reply = "天下第一吃仙丹"
		}
		else if (content === '4') {
			reply = {
				title: "技术改变世界",
				description: '只是个描述',
				picUrl: 'http://sanwenzx.com/uploads/allimg/100828/09442S544-0.jpg',
				url: 'http: www.baidu.com/'
			}
		}
		else if (content === '5') {
			var data = yield wechatApi.uploadMaterial('image', __dirname + '/11.jpg')
			reply = {
				type: 'image',
				mediaId: data.media_id
			}
		}


		this.body = reply
	}


	yield next
}