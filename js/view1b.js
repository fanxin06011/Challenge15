(function(){
function View1b(Observer){
	
	var view1b={};
	
	
	
	var width = 3800;  
	var height = 1200;  
	var color = d3.scale.category20();  			  
	var svg = d3.select("#view1b")
				.append("svg")  
				.attr("class","view1bsvg")
				.attr("width",width)  
				.attr("height",height);
	var destable=[[0,67],[6,43],[16,49],[16,66],[17,43],[17,67],[23,54],[26,59],[27,15],[28,66]
		,[32,33],[34,68],[38,90],[42,37],[43,56],[43,78],[45,24],[47,11],[48,87],[50,57],[60,37],
		[63,99],[67,37],[69,44],[73,79],[73,84],[76,22],[76,88],[78,37],[78,48],[79,87],[79,89],[81,77],
		[82,80],[83,88],[85,86],[86,44],[87,48],[87,63],[87,81],[92,81],[99,77]];
		
	var datalocSat=[];			
	d3.csv("data/SatResult.csv", function(error, data) {		
		for(var i=0;i<960;i++){
			var L1=data[i].L1-'0';var L2=data[i].L2-'0';var L3=data[i].L3-'0';var L4=data[i].L4-'0';var L5=data[i].L5-'0';
			var L6=data[i].L6-'0';var L7=data[i].L7-'0';var L8=data[i].L8-'0';var L9=data[i].L9-'0';var L10=data[i].L10-'0';
			var L11=data[i].L11-'0';var L12=data[i].L12-'0';var L13=data[i].L13-'0';var L14=data[i].L14-'0';var L15=data[i].L15-'0';
			var L16=data[i].L16-'0';var L17=data[i].L17-'0';var L18=data[i].L18-'0';var L19=data[i].L19-'0';var L20=data[i].L20-'0';
			var L21=data[i].L21-'0';var L22=data[i].L22-'0';var L23=data[i].L23-'0';var L24=data[i].L24-'0';var L25=data[i].L25-'0';
			var L26=data[i].L26-'0';var L27=data[i].L27-'0';var L28=data[i].L28-'0';var L29=data[i].L29-'0';var L30=data[i].L30-'0';
			var L31=data[i].L31-'0';var L32=data[i].L32-'0';var L33=data[i].L33-'0';var L34=data[i].L34-'0';var L35=data[i].L35-'0';
			var L36=data[i].L36-'0';var L37=data[i].L37-'0';var L38=data[i].L38-'0';var L39=data[i].L39-'0';var L40=data[i].L40-'0';
			var L41=data[i].L41-'0';var L42=data[i].L42-'0';
			datalocSat.push([L1,L2,L3,L4,L5,L6,L7,L8,L9,L10,L11,L12,L13,L14,L15,L16,L17,L18,L19,L20,L21,L22,L23,L24,L25,L26,L27,L28,L29,L30,L31,L32,L33,L34,L35,L36,L37,L38,L39,L40,L41,L42]);
		}
	});
	

	var datalocSun=[];			
	d3.csv("data/SunResult.csv", function(error, data) {		
		for(var i=0;i<960;i++){
			var L1=data[i].L1-'0';var L2=data[i].L2-'0';var L3=data[i].L3-'0';var L4=data[i].L4-'0';var L5=data[i].L5-'0';
			var L6=data[i].L6-'0';var L7=data[i].L7-'0';var L8=data[i].L8-'0';var L9=data[i].L9-'0';var L10=data[i].L10-'0';
			var L11=data[i].L11-'0';var L12=data[i].L12-'0';var L13=data[i].L13-'0';var L14=data[i].L14-'0';var L15=data[i].L15-'0';
			var L16=data[i].L16-'0';var L17=data[i].L17-'0';var L18=data[i].L18-'0';var L19=data[i].L19-'0';var L20=data[i].L20-'0';
			var L21=data[i].L21-'0';var L22=data[i].L22-'0';var L23=data[i].L23-'0';var L24=data[i].L24-'0';var L25=data[i].L25-'0';
			var L26=data[i].L26-'0';var L27=data[i].L27-'0';var L28=data[i].L28-'0';var L29=data[i].L29-'0';var L30=data[i].L30-'0';
			var L31=data[i].L31-'0';var L32=data[i].L32-'0';var L33=data[i].L33-'0';var L34=data[i].L34-'0';var L35=data[i].L35-'0';
			var L36=data[i].L36-'0';var L37=data[i].L37-'0';var L38=data[i].L38-'0';var L39=data[i].L39-'0';var L40=data[i].L40-'0';
			var L41=data[i].L41-'0';var L42=data[i].L42-'0';
			datalocSun.push([L1,L2,L3,L4,L5,L6,L7,L8,L9,L10,L11,L12,L13,L14,L15,L16,L17,L18,L19,L20,L21,L22,L23,L24,L25,L26,L27,L28,L29,L30,L31,L32,L33,L34,L35,L36,L37,L38,L39,L40,L41,L42]);
		}
	});
	//console.log(datalocSun[3][3]);
	var dataloc=[];
	d3.csv("data/FriResult.csv", function(error, data) {	
		for(var i=0;i<960;i++){
			var L1=data[i].L1-'0';var L2=data[i].L2-'0';var L3=data[i].L3-'0';var L4=data[i].L4-'0';var L5=data[i].L5-'0';
			var L6=data[i].L6-'0';var L7=data[i].L7-'0';var L8=data[i].L8-'0';var L9=data[i].L9-'0';var L10=data[i].L10-'0';
			var L11=data[i].L11-'0';var L12=data[i].L12-'0';var L13=data[i].L13-'0';var L14=data[i].L14-'0';var L15=data[i].L15-'0';
			var L16=data[i].L16-'0';var L17=data[i].L17-'0';var L18=data[i].L18-'0';var L19=data[i].L19-'0';var L20=data[i].L20-'0';
			var L21=data[i].L21-'0';var L22=data[i].L22-'0';var L23=data[i].L23-'0';var L24=data[i].L24-'0';var L25=data[i].L25-'0';
			var L26=data[i].L26-'0';var L27=data[i].L27-'0';var L28=data[i].L28-'0';var L29=data[i].L29-'0';var L30=data[i].L30-'0';
			var L31=data[i].L31-'0';var L32=data[i].L32-'0';var L33=data[i].L33-'0';var L34=data[i].L34-'0';var L35=data[i].L35-'0';
			var L36=data[i].L36-'0';var L37=data[i].L37-'0';var L38=data[i].L38-'0';var L39=data[i].L39-'0';var L40=data[i].L40-'0';
			var L41=data[i].L41-'0';var L42=data[i].L42-'0';
			dataloc.push([L1,L2,L3,L4,L5,L6,L7,L8,L9,L10,L11,L12,L13,L14,L15,L16,L17,L18,L19,L20,L21,L22,L23,L24,L25,L26,L27,L28,L29,L30,L31,L32,L33,L34,L35,L36,L37,L38,L39,L40,L41,L42]);
		}
	});
	
	var lengthlimit=480;
		
	var linear = d3.scale.linear()
			   .domain([0, lengthlimit])
			   .rangeRound([28800,86340]);		//08:00:00~23:59:00
	var dmax=0;
	var linear2;
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
	
	var timeindex1=0;
	var circles;
	var dfri=[];var dsat=[];var dsun=[];		
	
	
	var fri2;
	var frimax;
	var sat2;
	var satmax;
	var sun2;
	var sunmax;
	
	var linearfri;
	var linearsat;
	var linearsun;
	
	var lineFunctionfri;
	var lineFunctionsat;
	var lineFunctionsun;						 

	var lineGraphfri;
	var lineGraphsat;
	var lineGraphsun;
	
	var locnum=0;
		
	var parseDate = d3.time.format("%H:%M").parse;
	
	var x = d3.time.scale().range([0,480]);
	var datax=[];
	var datax1 = parseDate("8:00");
	var datax2 = parseDate("23:59");
	datax.push(datax1);datax.push(datax2);
	x.domain(d3.extent(datax.map(function(d) { return d; })));
	var xAxis = d3.svg.axis().scale(x).orient("bottom");

	svg.append("g")
				.attr("class","axisx")
				.attr("transform", "translate(15,510)")
				.call(xAxis);

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
	var data5=[0];
	var rects3=svg.append("g")
			.selectAll("rect")
			.data(data5)
			.enter()
			.append("rect")
			.attr("fill","red" )
			.attr("y",530)
			.attr("x",12.5)
			.attr("height", 495)
			.attr("width", 2);					
	var circlelag;
	
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

	var timeindex1=0;
	var daynum=0;
	
	var d2=[1];		
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
	
	
	
	
	
	
	
	setTimeout(function(){
		
		
		for(var i=0;i<960;i++){
			for(var j=0;j<42;j++){
				if(dataloc[i][j]>dmax){								
					dmax=dataloc[i][j];
				}
			}
		}

		linear2 = d3.scale.linear()
				   .domain([0, dmax])
				   .rangeRound([2.5,17.5]);
 
		circles = svg.append("g").selectAll("circle")  
                            .data(dataloc[0])  
                            .enter()  
                            .append("circle")  
                            .attr("r",2.5)  
                            .attr("fill","red")  
                            .attr("cx",function(d,i){return destable[i][0]*5;})
							.attr("cy",function(d,i){return 500-destable[i][1]*5;})
							.on("dblclick",function(d,i){dblclick(i);});



		
		for(var m=0;m<960;m++){ 
			dfri.push({"x":m,"y":dataloc[m][0]});
			dsat.push({"x":m,"y":datalocSat[m][0]});
			dsun.push({"x":m,"y":datalocSun[m][0]});
		}	
		fri2=d3.transpose(dataloc);
		frimax=d3.max(fri2[0]);
		sat2=d3.transpose(datalocSat);
		satmax=d3.max(sat2[0]);
		sun2=d3.transpose(datalocSun);
		sunmax=d3.max(sun2[0]);
		
		linearfri = d3.scale.linear()
					   .domain([0, frimax])
					   .range([166+505,6+505]);
		linearsat = d3.scale.linear()
				   .domain([0, satmax])
				   .range([333+505,173+505]);
		linearsun = d3.scale.linear()
				   .domain([0, sunmax])
				   .range([500+505,340+505]);
		
		lineFunctionfri = d3.svg.line()
								 .x(function(d) { return 15+d.x/2; })
								 .y(function(d) { return linearfri(d.y); })
								 .interpolate("linear");
		lineFunctionsat = d3.svg.line()
								 .x(function(d) { return 15+d.x/2; })
								 .y(function(d) { return linearsat(d.y); })
								 .interpolate("linear");
		lineFunctionsun = d3.svg.line()
								 .x(function(d) { return 15+d.x/2; })
								 .y(function(d) { return linearsun(d.y); })
								 .interpolate("linear");						 
		var pfri=svg.append("g");			
		lineGraphfri = pfri.append("path")
						   .attr("d", lineFunctionfri(dfri))
						   .attr("stroke", "steelblue")
						   .attr("stroke-width", 2) 
						   .attr("fill", "none");
						   
		var psat=svg.append("g");			
		lineGraphsat = pfri.append("path")
						   .attr("d", lineFunctionsat(dsat))
						   .attr("stroke", "yellowgreen")
						   .attr("stroke-width", 2) 
						   .attr("fill", "none");
		var psun=svg.append("g");			
		lineGraphsun = pfri.append("path")
						   .attr("d", lineFunctionsun(dsun))
						   .attr("stroke", "grey")
						   .attr("stroke-width", 2) 
						   .attr("fill", "none");
		
		circlelag=circles.append("title")
					.text(function(d,i){
						return dataloc[0][i];
					});	


	},1000); 
	
		
					   
	function numberindata(t){
		for(i=28800;i<86341;i=i+60){
			if(i>=t){return (i-28800)/60;}
		}
		
	}		   
	
	function dblclick(n){
		
		locnum=n;
		//console.log(destable[locnum]);
		dfri=[];dsat=[];dsun=[];		
		for(var m=0;m<960;m++){ 
			dfri.push({"x":m,"y":dataloc[m][n]});
			dsat.push({"x":m,"y":datalocSat[m][n]});
			dsun.push({"x":m,"y":datalocSun[m][n]});
		}	
		fri2=d3.transpose(dataloc);
		frimax=d3.max(fri2[n]);
		sat2=d3.transpose(datalocSat);
		satmax=d3.max(sat2[n]);
		sun2=d3.transpose(datalocSun);
		sunmax=d3.max(sun2[n]);
		
		linearfri = d3.scale.linear()
				   .domain([0, frimax])
				   .range([166+505,6+505]);
		linearsat = d3.scale.linear()
				   .domain([0, satmax])
				   .range([333+505,173+505]);
		linearsun = d3.scale.linear()
				   .domain([0, sunmax])
				   .range([500+505,340+505]);			
		
		
		lineGraphfri.transition()
					.duration(1000)
					.attr("d", lineFunctionfri(dfri));
						   
		lineGraphsat .transition()
					  .duration(1000)
					  .attr("d", lineFunctionsat(dsat));
		lineGraphsun.transition()
					  .duration(1000)
					  .attr("d", lineFunctionsun(dsun));						   
		Observer.fireEvent("chooseSpot", destable[locnum], "view1b");			  
	}
	
	
	
	
	
	
	function click(m){
		daynum=m;
		timetag2.text(function(d,i){
					if(daynum==0){return "Fri";}
					if(daynum==1){return "Sat";}
					if(daynum==2){return "Sun";}
				});
		if(m==0){
			circles.data(dataloc[timeindex1])  
							.transition()
							.duration(0) 
							.attr("r",function(d,i){
								return linear2(dataloc[timeindex1][i]);
								})  ;
		}
		else{
			if(m==1){
				circles.data(datalocSat[timeindex1])  
							.transition()
							.duration(0) 
							.attr("r",function(d,i){
								return linear2(datalocSat[timeindex1][i]);
								})  ;
			}
			else{
				circles.data(datalocSun[timeindex1])  
							.transition()
							.duration(0) 
							.attr("r",function(d,i){
								return linear2(datalocSun[timeindex1][i]);
								})  ;
			}
		}

	}
							
	function dragmove() {		
			var newx=d3.event.x-10;
			//console.log(newx);
			if(newx<0){newx=0;}
			if(newx>lengthlimit){newx=lengthlimit;}
			var dataloctmp=[];
			if(daynum==0){
				dataloctmp=dataloc;
				//console.log(dataloctmp[10][10]);
			}
			else{
				if(daynum==1){
					dataloctmp=datalocSat;
				}
				else{
					dataloctmp=datalocSun;
				}
			}
			timeindex1=numberindata(linear(newx));
			circles.data(dataloc[timeindex1])  
						.transition()
						.duration(0) 
						.attr("r",function(d,i){
							return linear2(dataloctmp[timeindex1][i]);
							})  ;

			circlelag.text(function(d,i){
					return dataloctmp[timeindex1][i];
				});
			
			
			var newx2=(linear(newx)-28800)/60
			rects2.attr("x",10+newx2/2);
			rects3.attr("x",12.5+newx2/2);					
			ddx=linear(newx);

			hourrelative=Math.floor(ddx/3600);
			minuterelative=Math.floor((ddx-hourrelative*3600)/60);
			if(minuterelative<10){minuterelative="0"+minuterelative;}
			timetag.text(function(d,i){return (hourrelative)+":"+minuterelative;});
			
			newx3=Math.floor(newx2+0.5);
				
	}
	




		view1b.onMessage = function(message, data, from){}

		return view1b;
	}
	window["View1b"] = View1b;
}
)()