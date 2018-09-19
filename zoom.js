function zoom(obj, area, fn) {
	var mouseDownX, mouseDownY, flag = false;
	obj.addEventListener('mousedown',function(e) {

		//鼠标按下时的鼠标所在的X，Y坐标
		if(obj.offsetLeft + Number(obj.style.width.replace('px', '')) - e.pageX > area || obj.offsetTop + Number(obj.style.height.replace('px', '')) - e.pageY > area) {
			return;
		}
		
		mouseDownX = e.pageX;
		mouseDownY = e.pageY;

		//表示鼠标已按下
		flag = true;
	})  
	document.addEventListener('mousemove', function(e) {
		// 确保鼠标已按下
		if(flag) {
			var mouseMoveX = e.pageX,
				mouseMoveY = e.pageY;
			obj.style.width = mouseMoveX-obj.offsetLeft + "px";
			obj.style.height = mouseMoveY-obj.offsetTop + "px";
		}

	})
	document.addEventListener('mouseup' , function() {
		//标识已松开鼠标
		flag = false;
		fn()
	})

}
