(function(){
	var width = 3700;  
	var height = 600;  
	var color = d3.scale.category20();  			  
	var svg = d3.select("#view1a")
				.append("svg")  
				.attr("class","view1asvg")
				.attr("width",width)  
				.attr("height",height);
	//var idnum=2;
	//var id=["577530","1204869"];
	var id=[];
	var idnum=0;
	var idnumlimit=150;
	var loc=[[],[],[]];
	var daynum=0;//0代表fri 1代表sat 2代表sun

	var xmlHttp
	var xmlDoc=[[],[],[]];
		///////////////////////////////////////////////////
	//人的点
	
	var circles = svg.append("g")
					 .selectAll("circle")  
						.data(id)  
						.enter()  
						.append("circle")  
						.attr("r",3)  
						.style("fill","red")  
						.attr("cx",0)
						.attr("cy",500);
	
	
	document.getElementById("view1choose").onclick=function(){//对每天每个id做一次查询
		circles.data(id)
				.exit()  
				.remove();
		for(var i=0;i<idnum;i++){
			for(var j=0;j<3;j++){
				showUser(id[i],i,j);
				
			}
		}
	};
	var sto;
	var ttime=28800;
	document.getElementById("view1autoplay").onclick=function(){
		if(document.getElementById("view1autoplay").value=="autoplay"){
			document.getElementById("view1autoplay").value="stop";
			autop();
		}else{
			document.getElementById("view1autoplay").value="autoplay";
			clearTimeout(sto);

		}
		
	}

	function autop(){
		
		ttime=ttime+60;
		rects2.attr("x",10+(ttime-28800)/120);
		hourrelative=Math.floor(ttime/3600);
		minuterelative=Math.floor((ttime-hourrelative*3600)/60);
		if(minuterelative<10){minuterelative="0"+minuterelative;}
		timetag.text(function(d,i){return (hourrelative)+":"+minuterelative;});

		for(var i=0;i<idnum;i++){
			findtime(i,ttime);
		}
		if(ttime<=86400){
		sto=setTimeout(function(){autop();},100);
		}
		
	}

	
	function showUser(id,i,day){ 
		 //document.getElementById("judge").innerHTML='0';
		 xmlHttp=GetXmlHttpObject()
		 if (xmlHttp==null)
		  {
		  alert ("Browser does not support HTTP Request")
		  return
		  } 
		 var url="b2.php"
		 url=url+"?id="+id
		 url=url+"&day="+day
		 url=url+"&sid="+Math.random()
		 //xmlHttp.onreadystatechange=stateChanged
		 xmlHttp.onreadystatechange=function(){
			if (xmlHttp.readyState==4 || xmlHttp.readyState=="complete"){
				xmlDoc[day][i]=xmlHttp.responseXML;
			}
		 }
		 xmlHttp.open("GET",url,false)
		 xmlHttp.send(null)
	 }
		 
	function GetXmlHttpObject(){ 
		var objXMLHttp=null
		if (window.XMLHttpRequest){
			objXMLHttp=new XMLHttpRequest()
		}
		else if (window.ActiveXObject){
			objXMLHttp=new ActiveXObject("Microsoft.XMLHTTP")
		}
		return objXMLHttp
	}
	
	////////////////////////////////////////////////////////////
	
	function findtime(i,time){
		var k=0;
		var limit=xmlDoc[daynum][i].getElementsByTagName("time").length;
		if(xmlDoc[daynum][i].getElementsByTagName("time")[0].childNodes[0].nodeValue>=time){
			loc[daynum][i].x=0;
			loc[daynum][i].y=0;
		}else{
			for(;(k+1)<limit;k++){
				if(xmlDoc[daynum][i].getElementsByTagName("time")[k+1].childNodes[0].nodeValue>time){break;}
			}
			if(k==(limit-1)){
				loc[daynum][i].x=0;loc[daynum][i].y=0;
			}
			else{
				loc[daynum][i].x=xmlDoc[daynum][i].getElementsByTagName("x")[k].childNodes[0].nodeValue;
				loc[daynum][i].y=xmlDoc[daynum][i].getElementsByTagName("y")[k].childNodes[0].nodeValue;
			}
		}
		if(i==idnum-1){
			circles.data(id)  
				   .transition()
				   .duration(0) 
				   .attr("cx",function(d,i){
						return loc[daynum][i].x*5;							
					})
					.attr("cy",function(d,i){
						return 500-5*loc[daynum][i].y;
					});
		}
	}

	///////////////////////////////////////////////////////
	//鼠标放在点上，显示id
	var circlelag=circles.append("title")
				.text(function(d,i){
					return d;
				});
	////////////////////////////////////////////////////
	var lengthlimit=480;
	var linear = d3.scale.linear()
			   .domain([0, lengthlimit])
			   .rangeRound([28800,86340]);		//08:00:00~23:59:00
	/////////////////////////////////////////////////////
	//时间 标签
	var ddx=linear(0);
	var hourrelative=Math.floor(ddx/3600);
	var minuterelative=Math.floor((ddx-hourrelative*3600)/60);
	if(minuterelative<10){minuterelative="0"+minuterelative;}
	var dd=[1];		
	var timetag=svg.append("g")
				.selectAll("text")
				.data(dd)  
				.enter()
				.append("text")
				.attr("transform","translate(10,80)")
				.text(function(d,i){return (hourrelative)+":"+minuterelative;})
				.attr("font-size", "30px")
				.attr("font-family", "Georgia");  
				   

	/////////////////////////////////////
	//fri、sat、sun的标签
	var y2=svg.append("g");
	var label=["steelblue","yellowgreen","grey"];
	var labelRect = y2.append("g")
					.selectAll("rect")	
					.data(label)
					.enter()
					.append("rect")
					.attr("x",10)  
					.attr("y",function(d,i){return 450+15 * i;})  
					.attr("width",25)
					.attr("height",12)
					.attr("fill",function(d,i){return d;})
					.on("click", function(d,i){click(i);});
	var label2=["Fri","Sat","Sun"];
	var labelText = y2.append("g")
					.selectAll("text")	
					.data(label2)
					.enter()
					.append("text")
					.attr("transform",function(d,i){return "translate(10," + (450+15 * i)+ ")";})
					.attr("dy",10) 
					.attr("dx",35)
					.attr("font-size", "15px")								
					.text(function(d,i){return d;}); 
	///////////////////////////////////////
	//点击日期标签触发
	function click(m){
		daynum=m;
		circles.data(id)  
				   .transition()
				   .duration(0) 
				   .attr("cx",function(d,i){
						return 0;							
					})
					.attr("cy",function(d,i){
						return 500;
					});
		
		timetag2.text(function(d,i){
					if(daynum==0){return "Fri";}
					if(daynum==1){return "Sat";}
					if(daynum==2){return "Sun";}
				});

	}
	/////////////////////////////////////
	//时间上方日期的显示
	var d2=[1];		
	var daynum=0;
	var timetag2=svg.append("g")
				.selectAll("text")
				.data(d2)  
				.enter()
				.append("text")
				.attr("transform","translate(10,45)")
				.text(function(d,i){
					if(daynum==0){return "Fri";}
					if(daynum==1){return "Sat";}
					if(daynum==2){return "Sun";}
				})
				.attr("font-size", "30px")
				.attr("font-family", "Georgia");
	//////////////////////////////////
	//数轴
	var parseDate = d3.time.format("%H:%M").parse;
	var x = d3.time.scale().range([0,480]);
	var datax=[];
	var datax1 = parseDate("8:00");
	var datax2 = parseDate("23:59");
	datax.push(datax1);datax.push(datax2);
	x.domain(d3.extent(datax.map(function(d) { return d; })));
	var xAxis = d3.svg.axis().scale(x).orient("bottom").ticks(10);
	svg.append("g")
				.attr("class","axisx")
				.attr("transform", "translate(15,510)")
				.call(xAxis);
	////////////////////////////
	//拖动的方块
	var data4=[0];
	var rects2=svg.append("g")
			.selectAll("rect")
			.data(data4)
			.enter()
			.append("rect")
			.attr("fill","red" )
			.attr("y",510)
			.attr("x",10)
			.attr("height", 20)
			.attr("width", 7)
			.call(d3.behavior.drag()
				.on("drag", dragmove)
			);	

	
	
	//////////////////////////////
	function dragmove(){
		//console.log(id);
		var scroll=document.getElementById("view1a").scrollLeft;
		var newx=event.clientX+scroll-10;
		//console.log(newx);

		if(newx<0){newx=0;}
		if(newx>lengthlimit){newx=lengthlimit;}
		ttime=linear(newx);
	
		var newx2=(linear(newx)-28800)/60
		//console.log(517+newx2/2);
		rects2.attr("x",10+newx2/2);
		
		ddx=linear(newx);

		hourrelative=Math.floor(ddx/3600);
		minuterelative=Math.floor((ddx-hourrelative*3600)/60);
		if(minuterelative<10){minuterelative="0"+minuterelative;}
		timetag.text(function(d,i){return (hourrelative)+":"+minuterelative;});

		for(var i=0;i<idnum;i++){
				findtime(i,ttime);
		}

	}

	
	
	
	function View1a(Observer){
		var view1a={};
		var tmpi=[];
		view1a.onMessage = function(message, data, from){
			console.log(message);
			if(message == "showPath"){
				console.log(data);
				if(from != view1a){
					onSelectPeople(data);
				}
			}
			if(message == "highlightstart"){
				console.log(data);
				if(from != view1a){
					tmpi=[];
					circles.transition()
							.duration(1)
							.attr("fill",function(d,i){
								if(_.indexOf(data, d)!=-1){tmpi.push(i);return "yellow";}
								else{return "red";}
							});
					
					for(var k=0;k<tmpi.length;k++){
						loctmp[k]=[];
						var len=xmlDoc[daynum][tmpi[k]].getElementsByTagName("x").length;
						for(var m=0;m<len;m++){
							var xx=xmlDoc[daynum][tmpi[k]].getElementsByTagName("x")[m].childNodes[0].nodeValue;
							var yy=xmlDoc[daynum][tmpi[k]].getElementsByTagName("y")[m].childNodes[0].nodeValue;
							loctmp[k].push({"x":xx,"y":yy});
						}
						//var lineGraphtmp= 
						lineGraph[k]=svg.append("g")
							   .append("path")
							   .attr("d", lineFunction(loctmp[k]))
							   .attr("stroke", "blue")
							   .attr("stroke-width", 2) 
							   .attr("fill", "none");
					}
					
					
					/*
					//console.log(loctmp);
					lineGraph.transition()
							.duration(0)
							.attr("d", lineFunction(loctmp));
							*/
				}
			}
			if(message == "highlightend"){
				console.log(data);
				
				if(from != view1a){
					circles.transition()
							.duration(1)
							.attr("fill","red");
					for(var i=0;i<tmpi.length;i++){
						loctmp[i]=[{x:0,y:0}];
						lineGraph[i].transition()
								.duration(0)
								.attr("d", lineFunction(loctmp[i]));
					}
					
					tmpi=[];
				}
			}
		}
		var loctmp=[];
		for(var i=0;i<idnumlimit;i++){
			loctmp.push([{x:0,y:0}]);
		}
		
		var lineFunction = d3.svg.line()
									 .x(function(d) { return d.x*5; })
									 .y(function(d) { return 500-5*d.y; })
									 .interpolate("basis");
									 /*
		var lineGraph= svg.append("g")
						   .append("path")
						   .attr("d", lineFunction(loctmp))
						   .attr("stroke", "blue")
						   .attr("stroke-width", 2) 
						   .attr("fill", "none");
		*/
		var lineGraph=_.range(idnumlimit);
		
		function onSelectPeople(data){
			console.log("view1a data: "+data);
			idnum=data.length;
			if(idnum>idnumlimit){idnum=idnumlimit;}
			id=data;
			sunloc=[];satloc=[];friloc=[];
			xmlDoc=[[],[],[]];
			for(var i=0;i<idnum;i++){
				loc[0].push({x:0,y:0});loc[1].push({x:0,y:0});loc[2].push({x:0,y:0});
				xmlDoc[0].push(0);xmlDoc[1].push(0);xmlDoc[2].push(0);
			}
			circles = circles.data([]).exit().remove();
			circles = circles.data(id)  
						.enter()  
						.append("circle")  
						.attr("r",3)  
						.attr("fill","red")  
						.attr("cx",0)
						.attr("cy",500)
						.on("mouseover",function(d,i){
							
							loctmp[0]=[];
							var len=xmlDoc[daynum][i].getElementsByTagName("x").length;
							for(var m=0;m<len;m++){
								var xx=xmlDoc[daynum][i].getElementsByTagName("x")[m].childNodes[0].nodeValue;
								var yy=xmlDoc[daynum][i].getElementsByTagName("y")[m].childNodes[0].nodeValue;
								loctmp[0].push({"x":xx,"y":yy});
							}
							//console.log(loctmp);
							
							
							var lineGraphtmp= svg.append("g")
							   .append("path")
							   .attr("d", lineFunction(loctmp[0]))
							   .attr("stroke", "blue")
							   .attr("stroke-width", 2) 
							   .attr("fill", "none");
							lineGraph[0]=lineGraphtmp;
							/*
							lineGraph.transition()
									.duration(0)
									.attr("d", lineFunction(loctmp));
											   */
							Observer.fireEvent("highlightstart", [d], view1a);
							d3.select(this).attr("fill","yellow")
						})
						.on("mouseout",function(d,i){
							loctmp[0]=[{x:0,y:0}];
							lineGraph[0].transition()
									.duration(0)
									.attr("d", lineFunction(loctmp[0]));
							d3.select(this).attr("fill", "red");
							Observer.fireEvent("highlightend", [d], view1a);
						});
			circlelag=circles.append("title")
				.text(function(d,i){
					return d;
				});
		}
		Observer.addView(view1a);
		return view1a;
		
		
		
		
	}
	
	window["View1a"] = View1a;
}
)()