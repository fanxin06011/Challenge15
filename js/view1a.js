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
	var sunloc=[];var satloc=[];var friloc=[];

	var daynum=0;//0代表fri 1代表sat 2代表sun

	var xmlHttp
	var xmlDocfri=[];var xmlDocsat=[];var xmlDocsun=[];
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
		for(var i=0;i<idnum;i++){
			for(var j=0;j<3;j++){
				showUser(id[i],i,j);
				
			}
		}
	};
	

	
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
				if(day==0){
					xmlDocfri[i]=xmlHttp.responseXML;
				}else if(day==1){
					xmlDocsat[i]=xmlHttp.responseXML;
				}else{xmlDocsun[i]=xmlHttp.responseXML;}
				//xmlDoc[i]=xmlHttp.responseXML;
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
	function findtimesun(i,time){
		var k=0;
		//console.log(id);
		if(xmlDocsun[i].getElementsByTagName("time")[0].childNodes[0].nodeValue>=time){
			sunloc[i].x=0;
			sunloc[i].y=0;
		}
		else{
			while(xmlDocsun[i].getElementsByTagName("time")[k+1].childNodes[0].nodeValue<time){k=k+1;}
			sunloc[i].x=xmlDocsun[i].getElementsByTagName("x")[k].childNodes[0].nodeValue;
			sunloc[i].y=xmlDocsun[i].getElementsByTagName("y")[k].childNodes[0].nodeValue;
		}
		if(i==idnum-1){
			circles.data(id)  
				   .transition()
				   .duration(0) 
				   .attr("cx",function(d,i){
					    console.log(sunloc[i].x*5);
						return sunloc[i].x*5;
						
					})
					.attr("cy",function(d,i){
						console.log(500-5*sunloc[i].y);
						return 500-5*sunloc[i].y;
					});
		}
	}
	function findtimesat(i,time){
		var k=0;
		if(xmlDocsat[i].getElementsByTagName("time")[0].childNodes[0].nodeValue>=time){
			satloc[i].x=0;
			satloc[i].y=0;
		}
		else{
			while(xmlDocsat[i].getElementsByTagName("time")[k+1].childNodes[0].nodeValue<time){k=k+1;}
			satloc[i].x=xmlDocsat[i].getElementsByTagName("x")[k].childNodes[0].nodeValue;
			satloc[i].y=xmlDocsat[i].getElementsByTagName("y")[k].childNodes[0].nodeValue;
		}
		if(i==idnum-1){
			circles.data(id)  
				   .transition()
				   .duration(0) 
				   .attr("cx",function(d,i){
						return satloc[i].x*5;							
					})
					.attr("cy",function(d,i){
						return 500-5*satloc[i].y;
					});
		}
	}
	function findtimefri(i,time){
		var k=0;
		if(xmlDocfri[i].getElementsByTagName("time")[0].childNodes[0].nodeValue>=time){
			friloc[i].x=0;
			friloc[i].y=0;
			flag=1;
		}else{
			while(xmlDocfri[i].getElementsByTagName("time")[k+1].childNodes[0].nodeValue<time){k=k+1;}
			friloc[i].x=xmlDocfri[i].getElementsByTagName("x")[k].childNodes[0].nodeValue;
			friloc[i].y=xmlDocfri[i].getElementsByTagName("y")[k].childNodes[0].nodeValue;
			flag=1;
		}
		if(i==idnum-1){
			circles.data(id)  
				   .transition()
				   .duration(0) 
				   .attr("cx",function(d,i){
						return friloc[i].x*5;							
					})
					.attr("cy",function(d,i){
						return 500-5*friloc[i].y;
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
		var ttime=linear(newx);
	
		var newx2=(linear(newx)-28800)/60
		//console.log(517+newx2/2);
		rects2.attr("x",10+newx2/2);
		
		ddx=linear(newx);

		hourrelative=Math.floor(ddx/3600);
		minuterelative=Math.floor((ddx-hourrelative*3600)/60);
		if(minuterelative<10){minuterelative="0"+minuterelative;}
		timetag.text(function(d,i){return (hourrelative)+":"+minuterelative;});
		//console.log(daynum);
		if(daynum==0){
			for(var i=0;i<idnum;i++){
				findtimefri(i,ttime);
			}
		}else if(daynum==1){
			for(var i=0;i<idnum;i++){
				findtimesat(i,ttime);
			}
		}else{
			
			for(var i=0;i<idnum;i++){
				//console.log(idnum+" "+ttime);
				findtimesun(i,ttime);
			}
		}

	}

	
	
	
	function View1a(Observer){
		var view1a={};
	
		view1a.onMessage = function(message, data, from){
			if(message == "showPath"){
				if(from != "view1a"){
					onSelectPeople(data);
				}
			}
		}
		function onSelectPeople(data){
			console.log("view1a showPath");
			idnum=data.length;
			id=data;
			for(var i=0;i<idnum;i++){
				sunloc.push({x:0,y:0});satloc.push({x:0,y:0});friloc.push({x:0,y:0});
				xmlDocfri.push(0);xmlDocsat.push(0);xmlDocsun.push(0);
			}
			circles = circles.data(id)  
						.enter()  
						.append("circle")  
						.attr("r",3)  
						.style("fill","red")  
						.attr("cx",0)
						.attr("cy",500);
		}

		return view1a;
		
	}
	window["View1a"] = View1a;
}
)()