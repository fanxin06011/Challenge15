function View2(Observer){
	var view = {};
	Observer.addView(view);
	//var baseDiv = getElementById("View2");

	var XY = 67;///////////////景点的接口
	var selectedId = [];///////输出id的接口	
	var selectedX = "num";
	var selectedY = "stay";	
	var colorList=["#fdae6b","#d62728"];
	var dayEnlarge = 1;
	document.getElementById("xAxisChoose").onchange=function(){
		choose();
		//alert("haha");
	}
	document.getElementById("yAxisChoose").onchange=function(){
		choose();
	}

	view.onMessage = function(message, data, from){
		//console.log("view2---"+message);
		if(message == "showPath"){
			data = selectedId;
		}
		else if(message == "chooseSpot"){
			XY = data[0] * 100 + data[1];
			console.log("view2---"+"chooseSpot"+XY);
			document.getElementById("numPlaceX").selected = "selected";
			document.getElementById("stayPlaceY").selected = "selected";
			choose();
		}
		else if(message == "highlightstart"){
			highLightId = data;
			d3.selectAll(".circleId")
				.attr("r",2)
				.style("fill",colorList[0])
				.style("fill-opacity",0.4);
			console.log("view2---"+"highlightstart!");
			console.log(highLightId);
			//highLightId=[103006, 313073, 439584, 657863, 1283386, 1412235, 1763672, 1781128, 1937834, 2049974];
			highLightId.forEach(function(id,i){
				var idClass=".id"+id;
				//console.log(idClass);
				d3.selectAll(idClass)
					.attr("r",5)
					.style("fill",colorList[1])
					.style("fill-opacity",1);
			})			
		}
		else if(message == "highlightend"){
			console.log("view2---"+"highlightend!");
			d3.selectAll(".circleId")
				.attr("r",2)
				.style("fill",colorList[0])
				.style("fill-opacity",0.4);
		}
		else{
		}
	}

	var width = $("div#View2").width() * 0.7;
	var height = $("div#View2").height() * 0.7;
	
	var sizeStandard = width/3;
	var paddingStandard = sizeStandard/6;
	var sizeEnlarge = sizeStandard * 1.95;
	var paddingEnLarge = paddingStandard * 1.95;

	var size = sizeStandard * 1;
	var padding = paddingStandard *1;
		
	//var color = d3.scale.category10();
	var svgFri = d3.select("#View2").append("svg")
		.attr("class","svg")
		.attr("id","svgFri")
		.attr("width", size  + padding)
		.attr("height", size  + padding)
		.append("g")
		.attr("transform", "translate(" + 1.5 * padding + "," + padding / 2 + ")");
	//svgFri.attr("width", 30).attr("height", 30);
		
	var svgSat = d3.select("#View2").append("svg")
		.attr("class","svg")
		.attr("id","svgSat")
		.attr("width", size  + padding)
		.attr("height", size  + padding)
		.append("g")
		.attr("transform", "translate(" + 1.5 * padding + "," + padding / 2 + ")");

	var svgSun = d3.select("#View2").append("svg")
		.attr("class","svg")
		.attr("id","svgSun")
		.attr("width", size  + padding)
		.attr("height", size  + padding)
		.append("g")
		.attr("transform", "translate(" + 1.5 * padding + "," + padding / 2 + ")");

	var svgEnlarge = d3.select("#View2b").append("svg")  
		.attr("class","svg")
		.attr("id","svgEnlarge")
		.attr("width", sizeEnlarge + paddingEnLarge)  
		.attr("height", sizeEnlarge + paddingEnLarge)
		.append("g")
		.attr("transform", "translate(" + (2.5 * padding) + "," + padding  + ")");
		
	var attrJson = [];
	attrJson["Fri"] = {};
	attrJson["Sat"] = {};
	attrJson["Sun"] = {};
	choose();

	$(window).resize(function(){
		var preWidth = width;
		var preHeight = height;
		var width = $("div#View2").width() * 2/3;
		var height = $("div#View2").width() * 2/3;
		sizeStandard = width/3;
		paddingStandard = sizeStandard/6;
		sizeEnlarge = sizeStandard * 1.95;
		paddingEnLarge = paddingStandard * 1.95;

		size = sizeStandard * 1;
		padding = paddingStandard * 1;
		
		d3.select("#View2")
			.selectAll("svg")
			.attr("width", size + padding)
			.attr("height", size  + padding);
		d3.select("#View2b")
			.select("#svgEnlarge")
			.attr("width", sizeEnlarge + 1 * paddingEnLarge)
			.attr("height", sizeEnlarge + 1.5 * paddingEnLarge);		
		choose();
	});	


	function getAttrValue(selectedX,selectedY,day){ 
		 var url = "v2.php";
		 url = url + "?array=" + selectedX + "," + selectedY;
		 url = url +"&day=" + day;

		 $.ajax({ url:url, async:true,  cache:false, dataType:'json',
			 success:function(data){  
				 //console.log(data);
				 attrJson[day]=data;    
			 },
			 error:function(xhr){console.log("error");} 
		 })
		 //console.log(datajson[0][0].time.length);
	 }
	 
	
	function choose(){
		d3.select("#View2b").style.height=d3.select("#View2b").style.width*1.05;
		console.log("view2---"+"000");
		//alert(document.getElementById("xAxisChoose").value);
		selectedX = document.getElementById("xAxisChoose").value;
		//alert(selectedX);
		selectedY = document.getElementById("yAxisChoose").value;
		if(selectedX=="numPlaceChoosen")selectedX="num"+XY;
		if(selectedX=="stayPlaceChoosen")selectedX="stay"+XY;
		if(selectedY=="numPlaceChoosen")selectedY="num"+XY;
		if(selectedY=="stayPlaceChoosen")selectedY="stay"+XY;
		d3.select("#View2").selectAll("text").remove();
		d3.select("#View2").selectAll(".cell").remove();
		d3.select("#View2").selectAll(".xAxis").remove();
		d3.select("#View2").selectAll(".yAxis").remove();

		//alert(dayEnlarge);

		d3.select("#View2b").selectAll("text").remove();
		d3.select("#View2b").selectAll(".cell").remove();
		d3.select("#View2b").selectAll(".xAxis").remove();
		d3.select("#View2b").selectAll(".yAxis").remove();
		if(dayEnlarge == 1){draw("Fri",1);}
		else if(dayEnlarge == 2){draw("Sat",2);}
		else if(dayEnlarge == 3){draw("Sun",3);}
		draw("Fri",0);
		draw("Sat",0);
		draw("Sun",0);		


		//d3.selectAll("circle").remove();
	}

	function draw(day,isEnlarge){

		var svg;
		var colorI;
		if(isEnlarge==0){
			size = sizeStandard;
			padding = paddingStandard;
			if(day=="Fri"){svg = svgFri; colorI=0;}
			else if(day=="Sat"){svg = svgSat; colorI=0;}
			else {svg = svgSun; colorI=0;}
		}
		else{
			size = sizeEnlarge;
			padding = paddingEnLarge;
			svg = svgEnlarge; colorI = 0;
			if(isEnlarge == 1){day = "Fri";}
			else if(isEnlarge == 2){day = "Sat"}
			else if(isEnlarge == 3){day = "Sun";}
		}
		
		var x = d3.scale.linear()
			.range([padding / 2, size - padding / 2]);
		var y = d3.scale.linear()
			.range([size - padding / 2, padding / 2]);

		var xAxis = d3.svg.axis()
			.scale(x)
			.orient("bottom")
			.ticks(5);
		var yAxis = d3.svg.axis()
			.scale(y)
			.orient("left")
			.ticks(5);

		getAttrValue(selectedX,selectedY,day);
		//console.log(attrJson[day]["id"]);

		if(isEnlarge==0){size = sizeStandard; padding = paddingStandard;}
		else{size = sizeEnlarge; padding = paddingEnLarge;}
		var domainByTrait = {},
			//traits = d3.keys(data[0]).filter(function(d) { return d == selectedX || d == selectedY; }),
			traits=[selectedX,selectedY],
			n = traits.length;
		traits.forEach(function(trait,i) {//确定真实值域		
			if(trait =="inin"||trait =="outout"){
				domainByTrait[trait] = [d3.min(attrJson[day][trait]),d3.max(attrJson[day][trait])];
			}
			else if(trait == "wayPercent"){
				domainByTrait[trait] = [0,(d3.max(attrJson[day][trait]))*1000/1000];
			}
			else {domainByTrait[trait] = [0,d3.max(attrJson[day][trait])];}
			//console.log(domainByTrait[trait]);
		});
		var traitsX=[selectedX],traitsY=[selectedY];

		
		xAxis.tickSize(size);//辅助线
		yAxis.tickSize(-size);
		if(isEnlarge==0){
			svg.append("text")
				.attr("x",size-selectedX.length*12)
				.attr("y",size)
				.text(function(){return selectedX});
			svg.append("text")
				.attr("x",-15)
				.attr("y",5)
				.text(function(){return selectedY});
		}
		else{
			svg.append("text").attr("x",size-25-selectedX.length*12).attr("y",size).text(selectedX);
			svg.append("text").attr("x",-15).attr("y",10).text(selectedY);
		}
			
		svg.append("text").attr("x",size/2-30).attr("y",0)
			.text(function(){
				if(day=="Fri")return "Friday";
				else if(day=="Sat")return "Saturday";
				else return "Sunday";
			})
			.on("dblclick", function(){
				d3.select("#View2b").selectAll("text").remove();
				d3.select("#View2b").selectAll(".cell").remove();
				d3.select("#View2b").selectAll(".xAxis").remove();
				d3.select("#View2b").selectAll(".yAxis").remove();
				if(day == "Fri"){draw("Fri",1); dayEnlarge = 1;}
				else if(day == "Sat"){draw("Sat",2); dayEnlarge =2;}
				else if(day == "Sun"){draw("Sun",3); dayEnlarge =3;}
				//d3.select("#View2b").style.display="block";
				document.getElementById("View2b").style.display="block";
			});	

		var brush = d3.svg.brush()
			.x(x)
			.y(y)
			.on("brushstart", brushstart)
			.on("brush", brushmove)
			.on("brushend", brushend);

		svg.selectAll(".xAxis")
			.data(traitsX)
			.enter().append("g")
			.attr("class", "xAxis")
			.attr("transform", function(d, i) { return "translate(" + (traitsX.length - i - 1) * size + ",0)"; })
			.each(function(d) {
				x.domain([domainByTrait[d][0],domainByTrait[d][1]]);
				d3.select(this).call(xAxis);
			});


		svg.selectAll(".yAxis")
			.data(traitsY)
			.enter().append("g")
			.attr("class", "yAxis")
			.attr("transform", function(d, i) { return "translate(0," + i * size + ")"; })
			.each(function(d) { y.domain(domainByTrait[d]); d3.select(this).call(yAxis); });

		var cell = svg.selectAll(".cell")
			.data(cross(traitsX, traitsY,"id"))
			.enter().append("g")
			.attr("class", "cell")
			//.attr("transform", function(d) { return "translate(" + (n - d.i - 1) * size + "," + d.j * size + ")"; })
			.each(plot);

		cell.call(brush);

		function plot(p) {
		//p.x--traitsX, p.y--traitsY
			var cell = d3.select(this);
			//x.domain(domainByTrait[p.x]);
			//y.domain(domainByTrait[p.y]);
			//框的外部
			cell.append("rect")
				.attr("class", "frame")
				.attr("x", function(){return padding / 2;})
				.attr("y", padding / 2)
				.attr("width", size - padding)
				.attr("height", size - padding);
			//描点d[p.x]--该点x属性值
			cell.selectAll("circleId")
				.data(attrJson[day]["id"])
				.enter().append("circle")
				.attr("class",function(d,i) {var id = +d;id="id"+id;return "circleId "+id; })
				.attr("cx", function(d,i) {return x(attrJson[day][selectedX][i]); })
				.attr("cy", function(d,i) {return y(attrJson[day][selectedY][i]); })
				.attr("r", 2)
				.style("fill", function(d) { return colorList[colorI]; });
		}

		var brushCell;
		var selectedId = [];
		
		// Clear the previously-active brush, if any.
		function brushstart(p) {
			Observer.fireEvent("highlightend", selectedId, view);
			selectedId=[];
			if (brushCell !== this) {
			d3.select(brushCell).call(brush.clear());
			x.domain(domainByTrait[p.x]);
			y.domain(domainByTrait[p.y]);
			brushCell = this;
			}
		}

		// Highlight the selected circles.
		function brushmove(p) {
			var e = brush.extent();
			/*svg.selectAll("circle").classed("hidden", function(d) {
				return e[0][0] > d[p.x] || d[p.x] > e[1][0] || e[0][1] > d[p.y] || d[p.y] > e[1][1];
			});*/
		}


		// If the brush is empty, select all circles.
		function brushend(p) {
			
			if (brush.empty()) ;//svg.selectAll(".hidden").classed("hidden", false);
			else {
			var e = brush.extent();
			//console.log(e);
			//console.log(attrJson[day]["id"].length);
			//for(i=-1;++i<attrJson[day]["id"].length;)
			for(i=0; i<attrJson[day]["id"].length; ++i)
			{
				if(e[0][0]<=attrJson[day][selectedX][i]&&attrJson[day][selectedX][i]<=e[1][0]
					&&e[0][1]<=attrJson[day][selectedY][i]&&attrJson[day][selectedY][i]<=e[1][1]){
					selectedId.push(parseInt(attrJson[day]["id"][i]));
				}
			}
			console.log("view2---");
			console.log(selectedId);//被选中的id列表
			Observer.fireEvent("highlightstart", selectedId, view);
			Observer.fireEvent("showPath", selectedId, view);////////////////////////////////
			}
		}

		function cross(a, b, id) {
			//var c = [], n = a.length, m = b.length, i, j;
			//for (i = -1; ++i < n;) for (j = -1; ++j < m;) c.push({x: a[i], i: i, y: b[j], j: j});
			var c = [];
			c.push({x:a[0],y:b[0],id:id});
			return c;
		}

	};
	
    document.getElementById("View2b").onmousedown = function() { 
        var evt = getEvent(); 
        moveable = true;  
        moveX = evt.clientX; 
        moveY = evt.clientY; 
        moveTop = parseInt(msgObj.style.top); 
        moveLeft = parseInt(msgObj.style.left); 
         
        document.onmousemove = function() { 
            if (moveable) { 
                var evt = getEvent(); 
                var x = moveLeft + evt.clientX - moveX; 
                var y = moveTop + evt.clientY - moveY; 
                if ( x > 0 &&( x + w < iWidth) && y > 0 && (y + h < iHeight) ) { 
                    msgObj.style.left = x + "px"; 
                    msgObj.style.top = y + "px"; 
                } 
            }     
        }; 
        document.onmouseup = function () {  
            if (moveable) {  
                document.onmousemove = docMouseMoveEvent; 
                document.onmouseup = docMouseUpEvent; 
                moveable = false;  
                moveX = 0; 
                moveY = 0; 
                moveTop = 0; 
                moveLeft = 0; 
            }  
        }; 
    } 

	return view;
};