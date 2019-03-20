var express = require('express');
var router = express.Router();
var mongo = require("mongodb-curd")
var databaseName = "test"
var collections = "userInfo";

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});


//=> 默认展示的数据
router.get("/default",function (req,res,next) {
	mongo.find(databaseName,collections,function(result) {
		if(result.length === 0) {
			res.json({"code":0,"msg":"查找不到",data:result})
		} else {
			res.json({"code":1,"msg":"获取成功",data:result})
		}	
	})
})








module.exports = router;