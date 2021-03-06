'use strict'

var xml2js = require('xml2js')
var Promise = require('bluebird')
var tpl = require('./tpl')

exports.parseXMLAsync = function (xml) {
	return new Promise(function (resolve, reject) {
		xml2js.parseString(xml, {trim: true}, function (err, content) {
			if (err) reject(err)
			else resolve(content)
		})
	})
}

function formatMessage(result) {
	var message = {}
	if (typeof result === 'object') {
		var keys = Object.keys(result)
		for (var i = 0; i < keys.length; i++) {
			var key = keys[i]
			var item = result[key]
			if (!(item instanceof Array) || item.length === 0) {
				continue
			}
			if (item.length === 1) {
				var val = item[0]
				if (typeof val === 'object') {
					message[key] = formatMessage(val)
				} 
				else {
					message[key] = (val || '').trim()
				}
			} 
			else {
				message[key] = []
				for (var j = 0; j < item.length; j++) {
					message[key].push(formatMessage(item[j]))
				}
			}
		}
	} 
	return message
}

exports.formatMessage = formatMessage

exports.tpl = function (content, message) {
	var info = {}
	var type = message.MsgType || 'text'
	var fromUserName = message.FromUserName
	var toUserName = message.ToUserName

	if (Array.isArray(content)) {
		type = 'news'
	}

	info.content = content	
	info.createTime = new Date().getTime()
	info.msgType = type
	info.fromUserName = fromUserName
	info.toUserName = toUserName
	info.mediaId = message.MediaId
	info.msgId = message.MsgId

	return tpl.compiled(info) 

}







