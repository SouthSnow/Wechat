'use strict'
var config = require('./config')
var Wechat = require('./wechat/wechat')
var wechatApi = new Wechat(config.wechat)

exports.reply = function *(next) {
	var message = this.weixin

	console.log('您上报的地理位置是:')
	this.body = "您上报的地理位置是: " + message.Latitude + '/' + message.Longitude + '_' + message.Precision
	
	var msgType = message.MsgType || 'text';

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
			console.log('data: ', JSON.stringify(data));
			reply = {
				type: 'image',
				mediaId: data.media_id
			}
		}
		else if (content === '6') {
			reply = [
				{
					title: "技术改变世界1",
					description: '只是个描述',
					picUrl: 'http://sanwenzx.com/uploads/allimg/100828/09442S544-0.jpg',
					url: 'https://www.baidu.com/'
				},
				{
					title: "技术改变世界2",
					description: '只是个描述',
					picUrl: 'http://sanwenzx.com/uploads/allimg/100828/09442S544-0.jpg',
					url: 'https://www.baidu.com/'
				},
				{
					title: "技术改变世界3",
					description: '只是个描述',
					picUrl: 'http://sanwenzx.com/uploads/allimg/100828/09442S544-0.jpg',
					url: 'https://www.baidu.com/'
				},
				{
					title: "技术改变世界4",
					description: '只是个描述',
					picUrl: 'http://sanwenzx.com/uploads/allimg/100828/09442S544-0.jpg',
					url: 'https://www.baidu.com/'
				},
				{
					title: "技术改变世界5",
					description: '只是个描述',
					picUrl: 'http://sanwenzx.com/uploads/allimg/100828/09442S544-0.jpg',
					url: 'http://www.baidu.com/'
				}
			]	
		}
		this.body = reply
	}
	else if (msgType === 'image') {
		this.body = {
			mediaId: message.MediaId
		};
	}
	else if (msgType === 'music') {
		this.body = {
			mediaId: message.MediaId,
			musicUrl: 'http://sanwenzx.com/uploads/allimg/100828/09442S544-0.jpg',
			title: "技术改变世界1",
			description: '只是个描述',
			hqMusicUrl: 'http://sanwenzx.com/uploads/allimg/100828/09442S544-0.jpg',
			thumbMediaId: 'http: www.baidu.com/'
		};
	}
	else if (msgType === 'video') {
		this.body = {
			mediaId: message.MediaId,
			title: '这是一段小视频',
			description: "这是一段小视频啊"
		};
	}
	else if (msgType === 'news') {
		
		this.body = [
			{
				title: "技术改变世界1",
				description: '只是个描述',
				picUrl: 'http://sanwenzx.com/uploads/allimg/100828/09442S544-0.jpg',
				url: 'http: www.baidu.com/'
			},
			{
				title: "技术改变世界2",
				description: '只是个描述',
				picUrl: 'http://sanwenzx.com/uploads/allimg/100828/09442S544-0.jpg',
				url: 'http: www.baidu.com/'
			},
			{
				title: "技术改变世界3",
				description: '只是个描述',
				picUrl: 'http://sanwenzx.com/uploads/allimg/100828/09442S544-0.jpg',
				url: 'http: www.baidu.com/'
			},{
				title: "技术改变世界4",
				description: '只是个描述',
				picUrl: 'http://sanwenzx.com/uploads/allimg/100828/09442S544-0.jpg',
				url: 'http: www.baidu.com/'
			},{
				title: "技术改变世界5",
				description: '只是个描述',
				picUrl: 'http://sanwenzx.com/uploads/allimg/100828/09442S544-0.jpg',
				url: 'http: www.baidu.com/'
			}
		]
	}
	else if (msgType === 'voice') {
		this.body = {
			mediaId: message.MediaId
		};
	}


	yield next
}













