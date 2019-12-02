window.onload = function() {
	//初始化
	init();

	let barrageArr = [];
	let send = document.querySelector('#send'); //发送按钮
	let video = document.querySelector('#left>video'); //视频组件
	let msgEl = document.querySelector('#right input'); //输入框
	let leftEl = document.getElementById('left');
	let preMsg;//记录上一句弹幕
	let baseUrl = 'http://127.0.0.1:5000';
	
	//点击发送,收集信息并放入数据库
	send.onclick = function() {
		if (!msgEl.value) {
			return;
		}
		let time = video.currentTime;
		time = timeFilter(time);
		let obj = {
			time,
			msg: msgEl.value
		};
		
		fire(obj.msg);
		preMsg = obj.msg;
		
		//存入数据库
		gAjax('/add', obj, (data) => {
			console.log(data);
		});
	};

	video.addEventListener('playing', function() {
		barrageTimer();
	});
	video.addEventListener('pause', function(){
		clearInterval(timer);
	})
	
	// setInterval(() => {
	// 	if(preMsg){
	// 		preMsg = '';
	// 	}
	// }, 500)
	
	//自动弹幕
	let timer;
	let preTime;
	function barrageTimer(){
		//定时获取时间点的弹幕内容
		timer = setInterval(() => {
			let videoTime = timeFilter(video.currentTime);
			gAjax('/getBarrages', {time: videoTime}, (ret) => {
				if(ret.code === 0){
					let barrageArr = ret.data;
					barrageArr.forEach((item, index) => {
						if ((item.time == videoTime) && ((!videoTime-preTime==0.5) || (item.msg != preMsg))) {
							fire(item.msg);
						}
					});
					//不影响下次
					preMsg = '';
					preTime = videoTime;
				}
			})	
		}, 500);
	}
	
	function fire(msg){
		//插入到页面
		let itemBar = document.createElement('div');
		itemBar.innerHTML = msg;
		leftEl.appendChild(itemBar);
		itemBar.style.position = 'absolute';
		itemBar.style.zIndex = 9999;
		itemBar.style.left = leftEl.offsetWidth + 'px';
		itemBar.style.top = Math.random()*50 + '%';
		itemBar.style.color = 'white';
		let nowL = leftEl.offsetWidth;
		let timer = setInterval(() => {
			nowL -= 0.7;
			itemBar.style.left = nowL + 'px';
			//判断边界
			if(nowL < 0-itemBar.offsetWidth){
				clearInterval(timer);
				leftEl.removeChild(itemBar);
			}
		});
	}
};

function init() {
	//动态设置右边高度
	document.querySelector('#right').style.height = document.querySelector('#left').offsetHeight + 'px';
}

function timeFilter(time) {
	let i = Math.floor(time);
	let t = time.toString().split('.')[1];
	t = t ? +(t.substring(0, 1)) : 0;
	let d = (t < 5) ? 0 : 5;
	time = +(i + '.' + d);
	return time;
}

function gAjax(url, data, cb){
	//步骤一:创建异步对象
	let xhr = new XMLHttpRequest();
	//步骤二:设置请求的url参数,参数一是请求的类型,参数二是请求的url,可以带参数,动态的传递参数starName到服务端
	let dataStr = '';
	Object.keys(data).forEach((key, index) => {
		dataStr += key + '=' + data[key] + '&';
	});
	if(dataStr){
		url = url + '?' + dataStr;
	}
	xhr.open('get', url);
	//步骤三:发送请求
	xhr.send();
	//步骤四:回调函数
	xhr.onload = function(data){
		cb && cb(JSON.parse(data.currentTarget.response));
	}
}