
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
	var file = yield parseFile(this.req)
	var news = yield saveNews(file.fields);
	yield saveImage(file.files.files, news);
	this.body = 'success\n';
})

function *parseFile (req) {
	return new Promise(function (resolve, reject) {
		var form = new formidable.IncomingForm();
		form.parse(req, function (error, fields, files) {
			console.log('fields: ', JSON.stringify(fields));
			console.log('files: ', JSON.stringify(files));
			if (error) {return reject(error)}
			resolve({files:files, fields: fields})
		})
	}).then(function (file) {
		return file	
	})
}

function * saveNews(fields) {
	return new Promise(function (resolve, reject) {
		new News({
			title: fields.title || "",
			description: fields.description || "",
			picUrl: fields.picUrl || "http://sanwenzx.com/uploads/allimg/100828/09442S544-0.jpg",
			url: fields.url ||  "https://wwww.baidu.com",
		}).save(function (error, news) {
			if (error) {return reject(error)}
			resolve(news);
		}).then(function (news) {
			return news
		})
	})
}

function *saveImage(files, news) {
	var from = files.path;
	var type = files.type || 'image/jpg';
	var ext = type.split('/')[1] || 'jpg'
  	ext = '.' + ext;
	return new Promise(function (resolve, reject) {
	  	if (ext.length > 5) {ext = '.jpg'};
		var to = __dirname + '/uploads/' + news._id + ext
		fs.rename(from, to, function (error) {
			if (error) {return reject(error)}
			resolve(to);
		})
	}).then(function (filepath) {
		news.picUrl = 'http://45.124.66.158:3030/files/' + news._id + ext;
		news.save();
		console.log('news: ', JSON.stringify(news));
		return filepath
	})
	
}


Router.get('/',function *(next) {
	if (this.params.id) {
		// qiniuUpload(this.params.id);
	}
	console.log('params: ', JSON.stringify(this.params));
})

exports = module.exports = Router;





