window.onload = function(){
	//初始化
	init();
	
	let barrageArr = [{
	}]
	let send = document.querySelector('#send');//发送按钮
	let video = document.querySelector('#left>video');//视频组件
	let msgEl = document.querySelector('#right input');//输入框
	
	//点击发送,收集信息并放入数组
	send.onclick = function(){
		if(!msgEl.value){
			return;
		}
		let time = video.currentTime;
		let i = Math.floor(time);
		let d = (+time.toString().split('.')[1].substring(0,1) < 5) ? 0 : 5;
		time = +(i+'.'+d);
		console.log(time)
		let obj = {
			time,
			msg: msgEl.value
		};
		barrageArr.push(obj)
	};
};

function init(){
	//动态设置右边高度
	document.querySelector('#right').style.height = document.querySelector('#left').offsetHeight + 'px';
}