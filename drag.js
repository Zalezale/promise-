function dragDom(obj, area) {
	var mouseDownX, mouseDownY, initX, initY, flag = false;
	obj.addEventListener('mousedown' , function(e) {
		//鼠标按下时的鼠标所在的X，Y坐标
		if(obj.offsetLeft + Number(obj.style.width.replace('px','')) - e.pageX < area && obj.offsetTop + Number(obj.style.height.replace('px','')) - e.pageY < area) {			
			return;
		}
		mouseDownX = e.pageX;
		mouseDownY = e.pageY;
		//初始位置的X，Y 坐标
		initX = obj.offsetLeft;
		initY = obj.offsetTop;
		//表示鼠标已按下
		flag = true;
	})
	document.addEventListener('mousemove', function(e) {
		// 确保鼠标已按下
		if(flag) {
			var mouseMoveX = e.pageX,
				mouseMoveY = e.pageY;
			obj.style.left = parseInt(mouseMoveX) - parseInt(mouseDownX) + parseInt(initX) + "px";
			obj.style.top = parseInt(mouseMoveY) - parseInt(mouseDownY) + parseInt(initY) + "px";
		}

	})
	document.addEventListener('mouseup' , function(e) {
		//标识已松开鼠标
		flag = false;
	})

}