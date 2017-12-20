var content_index = 0;//记录当前位置在第几屏
var container = document.getElementById('container');//大屏幕
var phone = document.getElementById('phone');//侧边手机
var contents_height = new Array();//声明一个数组，一会要存储滑到每一屏需要transilateY位移的距离，比如第一屏一定为0；第二屏为-400px；……
var content = document.getElementsByClassName('content');//获取7个块
var msg_box = document.getElementById('msg-box');//获取小手机左后一屏三条消息依次浮现的容器
var slide_center = document.getElementById('slide-center');//侧边手机的屏幕中心，在这个手机屏幕上图片上下切换

function resetHeight(){
	//存储八个快距离顶部的高度,一共7个块，但最后一瓶高度超过一屏，再次向下滑会滑到底部，滑到底部需要translateY的值记录在数组的最后一个值中，最后一个值得大小为，第六屏translate的值加上底部footer块的高度
	console.log('窗口大小改变时，更新数组中的值');
	for(var i= 0;i<(content.length-1);i++){
		//contents_height[i] = content[i].getBoundingClientRect().top;//这样会出现bug
		contents_height[i] = content[i].offsetTop;
	}
	contents_height[content.length-1]= contents_height[content.length-2]+footer.offsetHeight;

	phoneBottom = parseInt(getStyle(phone,"bottom"));//获取phone距离底部的值
}
resetHeight();
window.onresize=function(){  //窗口大小改变时，更新数组中的值
   resetHeight();
}  
	
//鼠标滚动式的方法
var mouseOnOff = true;//滚轮开关，用于开启关闭滚轮时间，两次滚轮效果之间要有1s的间隔
var dirc;//记录滚轮方向
var scrollFunc=function(e){//鼠标滚动事件
    e=e || window.event;

   	dirc =0;//向下滑动时dirc会为正，向上为负
   	if(e.wheelDelta){//IE/Opera/Chrome
        dirc=e.wheelDelta>0? -1:1;//谷歌e.wheelDelta为滚轮下负上正
    }else if(e.detail){//Firefox
        dirc=e.detail>0? 1:-1;//火狐e.detail为滚轮下正上负
    }
    if(mouseOnOff==true){//当滚轮开关处于开启状态，开始判断滚轮滚动方向和当前屏是否为第一屏或左后一屏
    	//向下滚动时，如果不是最后一屏，则向下翻一屏
	    if(dirc>0&&content_index<(contents_height.length-1)){
	    	moveContent(1);//向下翻一屏的方法
	    }
	    //向上滚动时，如果不是第一屏，则向上翻一屏
	    if (dirc<0&&content_index>0) {
	    	moveContent(-1);
	    }
    }
}
/*注册鼠标滚轮事件，将上面的鼠标滚动方法与鼠标滚轮绑定*/

/*IE注册事件*/
if(document.attachEvent){
     document.attachEvent('onmousewheel',scrollFunc);

}
/*Firefox注册事件*/
if(document.addEventListener){
    document.addEventListener('DOMMouseScroll',scrollFunc,false);
}//W3C
window.onmousewheel=document.onmousewheel=scrollFunc;//IE/Opera/Chrome/Safari

var header =document.getElementById('header');
var siderBar = document.getElementById('siderBar');//获取侧边导航栏
var siderBtn = siderBar.getElementsByTagName('span');//获取侧边导航栏每一个span按钮
for(var i=0;i<siderBtn.length;i++){//给每一个span添加点击事件
	siderBtn[i].index=i;
	siderBtn[i].onclick = function(){
		var index = this.index - content_index;//要滑到的快和当前块相差几个块
		moveContent(index);//滚动到按钮对应的块
	}
}


function moveContent(index){
	//index代表当前块和即将滑到的块之间相隔的块数
	//若当前块是3，即将到4，则需要传一个index=1，意为向下翻一屏
	//若当前块是4，即将到3，则需要传一个index=-1；
	//若当前块是3，即将到7，则需要传一个index=4；
	//……
	siderBtn[content_index].className="";//当前块按钮变暗
	content_index+=index;//当前屏数改变
	siderBtn[content_index].className = "on";//点击的按钮变亮
	if (content_index==6) {//解决刷新页面后直接点击左后一个按钮手机屏幕不动的bug
		slide_center.style.top= "-500%";
		msg_box.className = "moveIn";
	}
		console.log(contents_height[content_index]);
	    container.style.cssText = "transform:translateY(-"+contents_height[content_index]+"px)";//大屏幕滑动到相应位置
	    mouseOnOff = false;//用来禁用鼠标事件
	    setTimeout(function(){//一秒后解锁鼠标滚动式件
	    mouseOnOff = true;
	},1000)
	if(content_index<(content.length-1))//小手机屏滑动
	    slide_center.style.top= "-"+100*content_index+"%";
	if(content_index==(content.length-2))//倒数第二屏 msgBox 依次浮现
	{
	    msg_box.className = "moveIn";
	}
	if(content_index==0){//第一屏和其他屏小手机位置变化
	    phone.style.left="24.5%";
	    header.style.height='80px';

	}
	else{
	   	phone.style.left="14.7%";
	   	header.style.height='0';
	}
	if (content_index==6) {//到达底部时，phone向上移
		phone.style.bottom = (phoneBottom+footer.offsetHeight)+"px";
	}
	else{
		phone.style.bottom = "";
	}
}

function getStyle(obj,attr){//获取css内嵌样式
	if(obj.currentStyle){//ie
		return obj.currentStyle[attr];
	}else{
		return getComputedStyle(obj,false)[attr];
	}
}