const express = require('express');
const app = express();
const port = 5000;
const fs = require('fs');
var path = require('path');
const Barrage = require('./barrage.js');

app.use('/',express.static(path.join(__dirname,'./front_view/')));
// //允许跨域
// app.all('*', function(req, res, next) {
//     res.header("Access-Control-Allow-Origin", "*");
//     res.header("Access-Control-Allow-Headers", "Content-Type,Content-Length, Authorization, Accept,X-Requested-With");
//     res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
//     res.header("X-Powered-By",' 3.2.1')
//     if(req.method=="OPTIONS") res.send(200);/*让options请求快速返回*/
//     else  next();
// });

app.get('/', (req,res) => {
	res.sendFile(path.join(__dirname,'./front_view/index-online.html'));
});

//存储弹幕
app.get('/add', (req,res) => {
	let data = req.query;
	new Barrage(data).save()
		.then(
			(data) => {
				res.send(JSON.stringify({code: 0, msg: '存储成功'}));
			},
			(err) => {
				res.send(JSON.stringify({code: 1, msg: `存储失败,错误信息是${err}`}));
			}
		);
})

//按时间查找弹幕
app.get('/getBarrages', (req,res) => {
	let time = req.query.time;
	Barrage.find({time: time})
		.then(
			(ret) => {
				res.send(JSON.stringify({code: 0, data: ret}));
			},
			(err) => {
				res.send(JSON.stringify({code: 1, msg: `查询失败,错误信息是${err}`}));
			}
		);
})

app.listen(port, () => console.log(`server is running...`));

