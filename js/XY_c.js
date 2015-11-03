function View2(Observer){
	var view = {};
	//var baseDiv = getElementById("View2");

	var XY=67;///////////////景点的接口
	var selectedId = [];///////输出id的接口	
	var selectedX = "num";
	var selectedY = "stay";	

	document.getElementById("xAxisChoose").onchange=function(){
		choose();
		//alert("haha");
	}
	document.getElementById("yAxisChoose").onchange=function(){
		choose();
	}

	view.onMessage = function(message, data, from){
		console.log("view2");
		console.log(message);
		if(message == "showPath"){
			data = selectedId;
		}
		else if(message == "chooseSpot"){
			XY = data[0] * 100 + data[1];
			console.log(XY);
			document.getElementById("numPlaceX").selected = "selected";
			document.getElementById("stayPlaceY").selected = "selected";
			choose();
		}
		else{
		}
	}



	var size = 250,
		padding = 30;

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
		
	var color = d3.scale.category10();
	var svgFri = d3.select("#View2").append("svg")
		.attr("class","svg")
		.attr("id","svgFri")
		.attr("width", size  + padding)
		.attr("height", size  + padding)
		.append("g")
		.attr("transform", "translate(" + padding + "," + padding / 2 + ")");

	var svgSat = d3.select("#View2").append("svg")
		.attr("class","svg")
		.attr("id","svgSat")
		.attr("width", size  + padding)
		.attr("height", size  + padding)
		.append("g")
		.attr("transform", "translate(" + padding + "," + padding / 2 + ")");

	var svgSun = d3.select("#View2").append("svg")
		.attr("class","svg")
		.attr("id","svgSun")
		.attr("width", size  + padding)
		.attr("height", size  + padding)
		.append("g")
		.attr("transform", "translate(" + padding + "," + padding / 2 + ")");

		
	var fileName;


	draw("data/dfFri.csv");
	draw("data/dfSat.csv");
	draw("data/dfSun.csv");

	function choose(){
		console.log("000");
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
		draw("data/dfFri.csv");
		draw("data/dfSat.csv");
		draw("data/dfSun.csv");
		//d3.selectAll("circle").remove();
	}

	function draw(fileName){

	var svg;
	var colorI,day;
	if(fileName=="data/dfFri.csv"){svg = svgFri; colorI=0; day = "Friday";}
	else if(fileName=="data/dfSat.csv"){svg = svgSat; colorI=1; day = "Saturday";}
	else {svg = svgSun; colorI=2; day = "Sunday";}
	d3.csv(fileName, function(error, data) {
		if (error) throw error;

		//data[i]["num"]即可读取第i行num的值
		//d3.keys(data[0])返回了csv的首行,加个filter滤除了不是数字格式列的最后一列
		var domainByTrait = {},
			traits = d3.keys(data[0]).filter(function(d) { return d == selectedX || d == selectedY; }),
			n = traits.length;
		traits.forEach(function(trait,i) {//确定真实值域
			if(trait =="in"||trait =="out"){
				domainByTrait[trait] = [d3.min(data, function(d) { return parseInt(d[trait]); }),d3.max(data, function(d) { return parseInt(d[trait]); })];
			}
			else if(trait == "wayPercent")domainByTrait[trait] = [0,d3.max(data, function(d) { return parseInt(d[trait]*1000)/1000; })];
			else domainByTrait[trait] = [0,d3.max(data, function(d) { return parseInt(d[trait]); })];
		});
		var traitsX=[selectedX],traitsY=[selectedY];

		
		xAxis.tickSize(size);//辅助线
		yAxis.tickSize(-size);
		svg.append("text").attr("font-family","微软雅黑").attr("x",size-selectedX.length*12).attr("y",size).text(selectedX);
		svg.append("text").attr("font-family","微软雅黑").attr("x",-15).attr("y",15).text(selectedY);	
		svg.append("text").attr("font-family","微软雅黑").attr("x",size/2-30).attr("y",0).text(day);		
		
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
			.each(function(d) { x.domain(domainByTrait[d]); d3.select(this).call(xAxis); });

		svg.selectAll(".yAxis")
			.data(traitsY)
			.enter().append("g")
			.attr("class", "yAxis")
			.attr("transform", function(d, i) { return "translate(0," + i * size + ")"; })
			.each(function(d) { y.domain(domainByTrait[d]); d3.select(this).call(yAxis); });

		var cell = svg.selectAll(".cell")
			.data(cross(traitsX, traitsY))
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
				.attr("x", padding / 2)
				.attr("y", padding / 2)
				.attr("width", size - padding)
				.attr("height", size - padding);
			//描点d[p.x]--该点x属性值
			cell.selectAll("circle")
				.data(data)
				.enter().append("circle")
				.attr("class","circle")
				.attr("cx", function(d) { return x(d[p.x]); })
				.attr("cy", function(d) { return y(d[p.y]); })
				.attr("r", 2.5)
				.style("fill", function(d) { return color(colorI); });
		}

		var brushCell;

		// Clear the previously-active brush, if any.
		function brushstart(p) {
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
			svg.selectAll("circle").classed("hidden", function(d) {
				return e[0][0] > d[p.x] || d[p.x] > e[1][0] || e[0][1] > d[p.y] || d[p.y] > e[1][1];
			});
		}

		// If the brush is empty, select all circles.
		function brushend(p) {
			selectedId = [];
			if (brush.empty()) svg.selectAll(".hidden").classed("hidden", false);
			else {
			var e = brush.extent();
			console.log(e);
			for(i=-1;++i<data.length;)
			{
				//console.log(data[i][selectedX]);
				if(e[0][0]<=data[i][selectedX]&&data[i][selectedX]<=e[1][0]
					&&e[0][1]<=data[i][selectedY]&&data[i][selectedY]<=e[1][1]){
					selectedId.push(parseInt(data[i]["id"]));
				}
			}
			console.log(selectedId);//被选中的id列表
			Observer.fireEvent("showPath", selectedId, view);////////////////////////////////
			}
		}

		function cross(a, b) {
			var c = [], n = a.length, m = b.length, i, j;
			for (i = -1; ++i < n;) for (j = -1; ++j < m;) c.push({x: a[i], i: i, y: b[j], j: j});
			return c;
		}

		//d3.select(self.frameElement).style("height", size * n + padding + 20 + "px");
	});

	};
	return view;
};