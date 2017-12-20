var mnav=document.getElementById('mnav');
var onavLi=mnav.getElementsByTagName('li');
var oMain=document.getElementsByClassName('main');

for (var i = 0; i < onavLi.length; i++) {
	onavLi[i].index=i;
	onavLi[i].onclick=function(){
		for (var j = 0; j < onavLi.length; j++) {
			onavLi[j].className='';
			oMain[j].className='main';
		}
		this.className='on';
		oMain[this.index].className='main on';

	}
}