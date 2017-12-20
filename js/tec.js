	var tacs= document.getElementsByClassName('tacs');
	var btns = document.getElementById('btns').getElementsByTagName('span');
	for(var i=0;i<btns.length;i++)
	{
		btns[i].index = i;
		btns[i].onclick = function(){
			for (var i = 0; i < btns.length; i++) {
				btns[i].className = "";
				tacs[i].className =  "tac-"+(i +1)+"   tacs";
			}
			btns[this.index].className = "on";
			tacs[this.index].className = "tac-"+(this.index+1)+" on  tacs";

		}
	}
