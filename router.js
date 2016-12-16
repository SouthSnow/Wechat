'use-strict'

var Router = new require('koa-router')();
var qiniuUpload = require('./common/qiniuUpload');

// 第一个参数为别名, 第二个为路径匹配
Router.get('file', '/files:/id',function *(next) {
	if (this.params.id) {
		qiniuUpload(this.params.id);
	}
	console.log('params: ', JSON.stringify(this.params));
})

exports = module.exports = Router;