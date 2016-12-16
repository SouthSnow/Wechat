'use strict'

var Koa = require("koa")
var path = require('path')
var wechat = require('./wechat/g')
var util = require('./libs/util')
var wechat_file = path.join(__dirname, './config/wechat.txt')
var config = require('./config')
var weixin = require('./weixin')
var Router = require('./router')

var app = new Koa()
app.use(Router.routes());
app.use(wechat(config.wechat, weixin.reply))

app.listen(3030)


console.log("Listen: 3030")


