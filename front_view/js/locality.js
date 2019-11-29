window.onload = function() {
	//初始化
	init();

	let barrageArr = [{}]
	let send = document.querySelector('#send'); //发送按钮
	let video = document.querySelector('#left>video'); //视频组件
	let msgEl = document.querySelector('#right input'); //输入框
	let leftEl = document.getElementById('left');

	//点击发送,收集信息并放入数组
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
		barrageArr.push(obj)
		console.log(barrageArr)
		let itemBar = document.createElement('div');
		itemBar.innerHTML = obj.msg;
		leftEl.appendChild(itemBar);
	};

	// video.addEventListener('playing', function() {
	// 	barrageTimer();
	// });
	// video.addEventListener('pause', function(){
	// 	clearInterval(timer);
	// })

	// //弹幕
	// let timer;
	// function barrageTimer(){
	// 	timer = setInterval(() => {
	// 		let videoTime = timeFilter(video.currentTime);
	// 		barrageArr.forEach((item, index) => {
	// 			if (item.time == videoTime) {
	// 				console.log(111)
	// 				let itemBar = document.createElement('div');
	// 				itemBar.innerHTML = item.msg;
	// 				leftEl.appendChild(itemBar);
	// 			}
	// 		});
	// 	}, 100);
	// }
};

function init() {
	//动态设置右边高度
	document.querySelector('#right').style.height = document.querySelector('#left').offsetHeight + 'px';
}

function timeFilter(time) {
	let i = Math.floor(time);
	let d = (+time.toString().split('.')[1].substring(0, 1) < 5) ? 0 : 5;
	time = +(i + '.' + d);
	return time;
}
