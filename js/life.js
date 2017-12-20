var content_index=0;
var container=document.getElementById('container');
var clock=document.getElementById('clock');
var contents_height=new Array();
var content = document.getElementsByClassName('content');
var h=document.getElementById('h');
var m=document.getElementById('m');

function resetHeight(){
	for (var i = 0; i < content.length-1; i++) {
		contents_height[i]=content[i].offsetTop;
	}
	contents_height[content.length-1]= contents_height[content.length-2]+footer.offsetHeight;
	clockTop=parseInt(getStyle(clock,"top"));

}
resetHeight();
window.onresize=function(){
	resetHeight();
}

var mouseOnOff=true;
var dirc;
var scrollFunc=function(e){
	e=e || window.event;
	dirc=0;
	if (e.wheelDelta) {
		dirc=e.wheelDelta>0? -1:1;
	}else if(e.detail){
         dirc=e.detail>0? 1:-1;
	}
	if (mouseOnOff==true) {
		if (dirc>0&&content_index<(contents_height.length-1)) {
			moveContent(1);
		}
		if (dirc<0&&content_index>0) {
			moveContent(-1);
		}
	}
}
if (document.addEventListener) {
	document.addEventListener('DOMMouseScroll',scrollFunc,false);
}
window.onmousewheel=document.onmousewheel=scrollFunc;

var header=document.getElementById('header');
var siderBar=document.getElementById('siderBar');
var siderBtn=siderBar.getElementsByTagName('span');
for (var i = 0; i < siderBtn.length; i++) {
	siderBtn[i].index=i;
	siderBtn[i].onclick=function(){
		var index=this.index - content_index;
		moveContent(index);
	}
}

function moveContent(index){
	siderBtn[content_index].className="";
	h.className='on'+(content_index);
	m.className='on'+(content_index);
	content_index+=index;
	siderBtn[content_index].className="on";
	container.style.cssText="transform:translateY(-"+contents_height[content_index]+"px)";
	mouseOnOff=false;
	setTimeout(function(){
		mouseOnOff=true;
	},1000);

	if (content_index==0) {
		header.style.height='80px';
	}else{
		header.style.height='0';
	}
	if (content_index==4) {//到达底部时，phone向上移
		clock.style.top = (clockTop-footer.offsetHeight)+"px";
	}
	else{
		clock.style.top = "";
	}
	switch(content_index){
		case 0:hDeg=15;mDeg=0;break;
		case 1:hDeg=60;mDeg=180;break;
		case 2:hDeg=360;mDeg=540;break;
		case 3:hDeg=420;mDeg=900;break;
		case 4:hDeg=420;mDeg=900;break;
	}
	h.style.transform="rotate("+hDeg+"deg)";
	m.style.transform="rotate("+mDeg+"deg)";
}
function getStyle(obj,attr){
	if (obj.currentStyle) {
		return obj.currentStyle[attr];
	}else{
		return getComputedStyle(obj,false)[attr];
	}
}