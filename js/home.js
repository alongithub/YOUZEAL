var oTip=document.getElementById('tip');
	setTimeout(function(){
        oTip.style.cssText='opacity:0;display:none';
	},3000);

	var oPlay=document.getElementById('play');
	var vbox=document.getElementById('vbox');
	var contr=document.getElementById('contr');
	var pause=document.getElementById('pause');
	var close=document.getElementById('close');
	var off=true;
	oPlay.onclick=function(){
		video.currentTime=0;
		 vbox.style.cssText='opacity:1;display:block';
		 video.play();
         contr.style.opacity='1';
         oPlay.style.opacity='0';
         clearInterval(timer2);
         clearInterval(timer1);
	}
	pause.onclick=function(){
		if (off) {
			pause.className='pause on';
			video.pause();
			off=false;
		}else{
			video.play();
			pause.className='pause';
			off=true;
		}
		
	}
	close.onclick=function(){
	    vbox.style.cssText='opacity:0;display:none';
	    video.pause();
        contr.style.opacity='0';
        oPlay.style.opacity='1';
        t2();
    	t1();
    	change();
	}

	var nav=document.getElementById('nav');
	var nLi=nav.getElementsByTagName('li');
	var nP=nav.getElementsByTagName('p');
		var w=0;
	var timer1=null;
	var timer2=null;
	var imgBox=document.getElementById('img-box');
	var oBox=imgBox.getElementsByTagName('div');
    var index=0;//蓝条点的下标

    t2();
    t1();

for (var i = 0; i < nLi.length; i++) {
	nLi[i].num=i;
    nLi[i].onclick=function(){
    	clearInterval(timer2);
    	clearInterval(timer1);
    	index=this.num;
    	w=0;
    	t2();
    	t1();
    	change();   	
  }

}
function t1(){//	大图轮播  
	 timer1=setInterval(function(){
	 	clearInterval(timer2);	 		
	 	index++;
	 	w=0;
	 	if (index>2) {
	 		index=0;
	 	}
	 	change();
	 	setTimeout(function(){	
	 		t2();
	 	},1000);        	
	 },6800);
}
function change(){//t1+t2功能集合
	 nP[index].style.cssText='width:'+w+'px';
	 	for (var i = 0; i < nLi.length; i++) {
     	nLi[i].className='';
 	}
	 	nLi[index].className='on';
	 	imgBox.style.cssText='transform:translateX(-'+(index*100)+'%)';    
}
function t2(){//蓝条运动条 
	timer2=setInterval(function(){
		w++;
        nP[index].style.cssText='width:'+w+'px';
	},120);
}

var main=document.getElementById('main');
var content=document.getElementById('content');
var contentBox=main.getElementsByClassName('content-box');
var siderBar=document.getElementById('siderBar');
var oSpan=siderBar.getElementsByTagName('span');
var oA=siderBar.getElementsByTagName('a');
var bgImg=document.getElementsByClassName('bgImg');
var desc=document.getElementsByClassName('desc');
var timer3=null;


for (var i = 0; i < oSpan.length-1; i++) {
	oSpan[i].i=i;	
	oSpan[i].onclick=function(){
		index2=this.i;
		clearInterval(timer3);
        boxChange();
		for (var j = 0; j < oSpan.length-1; j++) {
		contentBox[j].className='content-box';				
		}
		main.className='main main'+(index2+1);
		contentBox[index2].className='content-box on';
	}
}
boxChange();
function boxChange(){
	timer3=setInterval(function(){
     index2++;
     if (index2==oSpan.length-1) index2=0;
     oSpan[index2].onclick();

    setTimeout(function(){
		var test=[1.2,1];
	    var xnum=test[Math.floor(Math.random()*2)];
	    for (var i = 0; i < bgImg.length; i++) {
			bgImg[i].a=i;
			//bgImg[i].style.transform='scale('+xnum+')';
			bgImg[i].style.cssText='transition:7s ease-in;transform:scale('+xnum+')';
		}
    },2000);
     
},6000);
}
var index2=0;//siderBar的span下标
var header=document.getElementById('header');
var search=document.getElementById('search');
var bgBox2=document.getElementById('bg-box-2');
var footer=document.getElementById('footer');
var oTop=null;
var oHeight=null;
var boxHeight=null;
var bgBox2_height=null;
var sum=0;
window.onscroll=function(){
	oTop=document.documentElement.scrollTop||document.body.scrollTop;
	if (oTop>50) {
         header.className='header on';
         search.style.cssText='opacity:1;display:block;';
	}else{
		header.className='header';
		search.style.cssText='opacity:0;display:none;';
	}
	oHeight=document.documentElement.clientHeight;//当前窗口的高度
	if (oTop>=oHeight) {
		header.style.cssText='height:0;transition:all 500ms;';
		    main.style.cssText='position:fixed;top:0;';
	}else{
         header.style.cssText='';
         main.style.cssText='position:absolute;top:0;';

	}
	bgBox2_height=bgBox2.offsetHeight;
	sum=bgBox2_height-oHeight;
	if (oTop>=bgBox2_height) {
       main.style.cssText='position:absolute;bottom:0;';
              
	}
	if (oTop>oHeight&&oTop<(2*oHeight)) {
		oSpan[0].onclick();
	}
	else if(oTop>(2*oHeight)&&oTop<(3*oHeight)) {
		oSpan[1].onclick();
	}
	else if(oTop>(3*oHeight)){
        oSpan[2].onclick();
	}

}

	var video = document.getElementById('video');
	var vHeight ;
	// var vb = video.videoWidth/video.videoHeight;
	//var vb = 960/540;
	var vb;
	window.onload =function(){
		vb = video.videoWidth/video.videoHeight;
		setWidthAndHeight();
	}
	var winWidth;
	var winHeight;
	var vHeight;
	var vWidth;

	window.onresize=function(){  
	    setWidthAndHeight();
	}  
	function setWidthAndHeight(){
		// 获取窗口宽度
		winWidth = document.body.scrollWidth;
			
		// 获取窗口高度
		if (window.innerHeight)
			winHeight = window.innerHeight;
		else if ((document.body) && (document.body.clientHeight))
			winHeight = document.body.clientHeight;
		//console.log(vb+"--"+winWidth/winHeight)
        if (vb>(winWidth/winHeight)) {
	        console.log("height固定")
	        video.style.width = "";
	        video.style.height = winHeight+"px";
	        vHeight=video.clientHeight;
	        vWidth= video.clientWidth;
	        video.style.top = "0px";
	        video.style.left = "-"+(vWidth-winWidth)/2+"px";
        }else{
	        console.log("wid固定")
	        video.style.height ="";
	        video.style.width = winWidth+"px";
	        vHeight=video.clientHeight;
	        vWidth= video.clientWidth;
	        video.style.left = "0px";
	        video.style.top = "-"+(vHeight-winHeight)/2+"px";
        }
    }

