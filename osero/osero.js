try{
	var color=["black","white","lime"];
	var ColorName=["黒","白"];
	var osero=[];
	var turn=0;
	for(var i1=0;i1<=7;i1++){
		osero.push([2,2,2,2,2,2,2,2]);
	}
	osero[3][3]=0;
	osero[3][4]=1;
	osero[4][3]=1;
	osero[4][4]=0;
	var a='<table id="gameboard" border="1" class="table" bgcolor="lime">';
	for(var i1=0;i1<=7;i1++){
		a+="<tr>";
		for(var i2=0;i2<=7;i2++){
			a+='<td width="25px" height="25px"><span type "button" onclick="Click('+String(i2)+","+String(i1)+","+osero[i2][i1]+')"><font color="'+color[osero[i2][i1]]+'">●</font></span></td>';
		}
		a+='</tr>';
	}
	a+='</table>';
	document.write(a);
	
	function Click(x,y,pc){
		try{
			//alert("X:"+String(x)+" Y:"+String(y)+" Color:"+color[osero[x][y]]);
			var nc=(turn+1)%2;
			if(CanPut(x,y,turn,osero)){
				osero=Put(x,y,turn,osero);
				ReloadBoard(osero);
				var PutCount={c:0,nc:0};
				for(var i1=0;i1<=7;i1++){
					for(var i2=0;i2<=7;i2++){
						if(CanPut(i1,i2,turn,osero))PutCount.c++;
						if(CanPut(i1,i2,nc,osero))PutCount.nc++;
					}
				}
				if(PutCount.nc===0){
					if(PutCount.c===0){
						FinishGame(osero);
					}else{
						AddLog("["+ColorName[nc]+"] 置く場所がありませんでした。パスします。");
					}
				}else{
					AddLog("["+ColorName[turn]+"] X:"+String(x+1)+", Y:"+String(y+1)+"に置きました");
					game=0;
					turn=(turn+1)%2;
				}
				if(game!==2)ChangeGuide(ColorName[turn]+"のターン");
			}else{
				alert("X:"+String(x+1)+",Y:"+String(y+1)+"には置けません");
			}
		}catch(e){
			alert(e);
		}
	}
	
	function CanPut(x,y,c,board){
		var nc=(c+1)%2;
		if(board[y][x]!=2)return false;
		var flag={x:true,_x:true,y:true,_y:true,xy:true,x_y:true,_xy:true,_x_y:true};
		var count={x:0,_x:0,y:0,_y:0,xy:0,x_y:0,_xy:0,_x_y:0};
		for(var i1=1;i1<=7;i1++){
			if(x+i1<=7){
				if(flag.x){
					switch(board[y][x+i1]){
						case 2:
							flag.x=false;
							break;
						case c:
							if(count.x>0)return true;
							flag.x=false;
							break;
						case nc:
							count.x++;
							break;
					}
				}
				if(y+i1<=7){
					if(flag.xy){
						switch(board[y+i1][x+i1]){
							case 2:
								flag.xy=false;
								break;
							case c:
								if(count.xy>0)return true;
								flag.xy=false;
								break;
							case nc:
								count.xy++;
								break;
						}
					}
				}
				if(y-i1>=0){
					if(flag.x_y){
						switch(board[y-i1][x+i1]){
							case 2:
								flag.x_y=false;
								break;
							case c:
								if(count.x_y>0)return true;
								flag.x_y=false;
								break;
							case nc:
								count.x_y++;
								break;
						}
					}
				}
			}
			if(x-i1>=0){
				if(flag._x){
					switch(board[y][x-i1]){
						case 2:
							flag._x=false;
							break;
						case c:
							if(count._x>0)return true;
							flag._x=false;
							break;
						case nc:
							count._x++;
							break;
					}
				}
				if(y+i1<=7){
					if(flag._xy){
						switch(board[y+i1][x-i1]){
							case 2:
								flag._xy=false;
								break;
							case c:
								if(count._xy>0)return true;
								flag._xy=false;
								break;
							case nc:
								count._xy++;
								break;
						}
					}
				}
				if(y-i1>=0){
					if(flag._x_y){
						switch(board[y-i1][x-i1]){
							case 2:
								flag._x_y=false;
								break;
							case c:
								if(count._x_y>0)return true;
								flag._x_y=false;
								break;
							case nc:
								count._x_y++;
								break;
						}
					}
				}
			}
			if(y+i1<=7){
				if(flag.y){
					switch(board[y+i1][x]){
						case 2:
							flag.y=false;
							break;
						case c:
							if(count.y>0)return true;
							flag.y=false;
							break;
						case nc:
							count.y++;
							break;
					}
				}
			}
			if(y-i1>=0){
				if(flag._y){
					switch(board[y-i1][x]){
						case 2:
							flag._y=false;
							break;
						case c:
							if(count._y>0)return true;
							flag._y=false;
							break;
						case nc:
							count._y++;
							break;
					}
				}
			}
		}
		return false;
	}
	
	function Put(x,y,c,board){
		var nc=(c+1)%2;
		var rt=[];
		var set={x:[],_x:[],y:[],_y:[],xy:[],x_y:[],_xy:[],_x_y:[]};
		var flag={x:true,_x:true,y:true,_y:true,xy:true,x_y:true,_xy:true,_x_y:true};
		for(var i1=1;i1<=7;i1++){
			if(x+i1<=7){
				if(flag.x){
					switch(board[y][x+i1]){
						case 2:
							flag.x=false;
							break;
						case c:
							for(var i2=0;i2<set.x.length;i2++){
								rt.push(set.x[i2]);
							}
							flag.x=false;
							break;
						case nc:
							set.x.push([y,x+i1]);
							break;
					}
				}
				if(y+i1<=7){
					if(flag.xy){
						switch(board[y+i1][x+i1]){
							case 2:
								flag.xy=false;
								break;
							case c:
								for(var i2=0;i2<set.xy.length;i2++){
									rt.push(set.xy[i2]);
								}
								flag.xy=false;
								break;
							case nc:
								set.xy.push([y+i1,x+i1]);
								break;
						}
					}
				}
				if(y-i1>=0){
					if(flag.x_y){
						switch(board[y-i1][x+i1]){
							case 2:
								flag.x_y=false;
								break;
							case c:
								for(var i2=0;i2<set.x_y.length;i2++){
									rt.push(set.x_y[i2]);
								}
								flag.x_y=false;
								break;
							case nc:
								set.x_y.push([y-i1,x+i1]);
								break;
						}
					}
				}
			}
			if(x-i1>=0){
				if(flag._x){
					switch(board[y][x-i1]){
						case 2:
							flag._x=false;
							break;
						case c:
							for(var i2=0;i2<set._x.length;i2++){
								rt.push(set._x[i2]);
							}
							flag._x=false;
							break;
						case nc:
							set._x.push([y,x-i1]);
							break;
					}
				}
				if(y+i1<=7){
					if(flag._xy){
						switch(board[y+i1][x-i1]){
							case 2:
								flag._xy=false;
								break;
							case c:
								for(var i2=0;i2<set._xy.length;i2++){
									rt.push(set._xy[i2]);
								}
								flag._xy=false;
								break;
							case nc:
								set._xy.push([y+i1,x-i1]);
								break;
						}
					}
				}
				if(y-i1>=0){
					if(flag._x_y){
						switch(board[y-i1][x-i1]){
							case 2:
								flag._x_y=false;
								break;
							case c:
								for(var i2=0;i2<set._x_y.length;i2++){
									rt.push(set._x_y[i2]);
								}
								flag._x_y=false;
								break;
							case nc:
								set._x_y.push([y-i1,x-i1]);
								break;
						}
					}
				}
			}
			if(y+i1<=7){
				if(flag.y){
					switch(board[y+i1][x]){
						case 2:
							flag.y=false;
							break;
						case c:
							for(var i2=0;i2<set.y.length;i2++){
								rt.push(set.y[i2]);
							}
							flag.y=false;
							break;
						case nc:
							set.y.push([y+i1,x]);
							break;
					}
				}
			}
			if(y-i1>=0){
				if(flag._y){
					switch(board[y-i1][x]){
						case 2:
							flag._y=false;
							break;
						case c:
							for(var i2=0;i2<set._y.length;i2++){
								rt.push(set._y[i2]);
							}
							flag._y=false;
							break;
						case nc:
							set._y.push([y-i1,x]);
							break;
					}
				}
			}
		}
		board[y][x]=c;
		for(var i1=0;i1<rt.length;i1++){
			board[rt[i1][0]][rt[i1][1]]=c;
		}
		return board;
	}
	
	function ReloadBoard(board){
		for(var i1=0;i1<=7;i1++){
			for(var i2=0;i2<=7;i2++){
				gameboard.rows[i2].cells[i1].innerHTML="<td width=\"25\" height=\"25\"><span type \"button\" onclick=\"Click("+String(i1)+","+String(i2)+","+osero[i2][i1]+")\"><font color=\""+color[osero[i2][i1]]+"\">●</font></span></td>";
			}
		}
	}
	
	function ChangeGuide(str){
		var obj=document.getElementById("guide");
		obj.innerHTML=str;
	}
	
	function AddLog(str){
		try{
			var obj=document.getElementById("log");
			obj.innerHTML+='<div align="left">'+str+"<div><br/>";
			obj.scrollTop=obj.scrollHeight;
		}catch(e){
			alert(e);
		}
	}
	
	function FinishGame(board){
		try{
			var ColorCount={b:0,w:0};
			for(var i1=0;i1<=7;i1++){
				for(var i2=0;i2<=7;i2++){
					switch(board[i1][i2]){
						case 0:
							ColorCount.b++;
							break;
						case 1:
							ColorCount.w++;
							break;
					}
				}
			}
			var winner=ColorCount.b-ColorCount.w;
			AddLog("＜ゲーム終了＞");
			if(winner===0){
				AddLog("引き分け!!!<br/>黒："+String(ColorCount.b)+"<br/>白："+String(ColorCount.w));
			}else if(winner>0){
				AddLog("黒の勝ち!!!<br/>黒："+String(ColorCount.b)+"<br/>白："+String(ColorCount.w));
			}else{
				AddLog("白の勝ち!!!<br/>黒："+String(ColorCount.b)+"<br/>白："+String(ColorCount.w));
			}
			ChangeGuide("ゲーム終了!!!");
		}catch(e){
			alert(e);
		}
	}
	
}catch(e){
	alert(e);
}
