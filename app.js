'use strict'

var Koa = require("koa")
var path = require('path')
var wechat = require('./wechat/g')
var util = require('./libs/util')
var wechat_file = path.join(__dirname, './config/wechat.txt')
var config = require('./config')
var weixin = require('./weixin')
var router = require('./router')

var app = new Koa()
app.use(router.routes())

// app.use(wechat(config.wechat, weixin.reply))
// var sendfile = require('koa-sendfile')

// app.use(function* (next) {
//   var stats = yield sendfile(this, "/Users/fulipang/Projects/Wechat/uploads/default.jpg")
//   if (!this.status) this.throw(404)
// })
app.listen(3030)


console.log("Listen: 3030")


