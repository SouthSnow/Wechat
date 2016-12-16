
var Router = require('koa-router')();
var qiniuUpload = require('./common/qiniuUpload');
var sendfile = require('koa-sendfile');
var fs = require('fs');
var path = require('path');


// 第一个参数为别名, 第二个为路径匹配
Router.get('file', '/files/:id',function * (next) {
    var despath = path.join(__dirname,('./uploads/' + this.params.id)); 
      var filepath = yield getFilePath(despath)
      yield sendfile(this, filepath);
      console.log("filepath1: " + filepath) 
      yield next;
      console.log("filepath2: " + filepath) 

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


Router.get('/',function *(next) {
	if (this.params.id) {
		// qiniuUpload(this.params.id);
	}
	console.log('params: ', JSON.stringify(this.params));
})

exports = module.exports = Router;