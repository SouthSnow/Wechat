'use strict'

var Koa = require("koa")
var path = require('path')
var wechat = require('./wechat/g')
var util = require('./libs/util')
var wechat_file = path.join(__dirname, './config/wechat.txt')
var config = require('./config')
var weixin = require('./weixin')



var app = new Koa()

app.use(wechat(config.wechat, weixin.reply))

app.listen(8080)

console.log("Listen: 8080")


