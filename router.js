
var Router = require('koa-router')();
var qiniuUpload = require('./common/qiniuUpload');
var sendfile = require('koa-sendfile');
var fs = require('fs');
var path = require('path');
var News = require('./common/mongoose').News;
var formidable = require('formidable');



// 第一个参数为别名, 第二个为路径匹配
Router.get('file', '/files/:id',function * (next) {
    var despath = path.join(__dirname,('./uploads/' + this.params.id)); 
      var filepath = yield getFilePath(despath)
      yield sendfile(this, filepath);
      yield next;
      console.log("filepath: " + filepath) 

});

function *getFilePath(despath) {
	return new Promise(function (reslove, reject) {
    	fs.exists(despath,function (exists) {
	        if (!exists) {
	          despath = path.join(__dirname,('./uploads/' + 'default.jpg'));
	        }
	        reslove(despath)
   	 	})
   }).then(function (filepath) {
       return filepath
   })
}

// 存储微信图文信息
Router.post('/api/material/:id',function *(next) {
	var form = new formidable.IncomingForm();
	form.parse(this.req, function (error, fields, files) {
		console.log('fields: ', JSON.stringify(fields));
		new News({
			title: fields.title || "",
			description: fields.description || "",
			picUrl: fields.picUrl || "http://sanwenzx.com/uploads/allimg/100828/09442S544-0.jpg",
			url: fields.url ||  "https://wwww.baidu.com",
		}).save(function (error, news) {
			console.log('news title:', news.title);
		})
	})
	this.body = 'success';
})


Router.get('/',function *(next) {
	if (this.params.id) {
		// qiniuUpload(this.params.id);
	}
	console.log('params: ', JSON.stringify(this.params));
})

exports = module.exports = Router;