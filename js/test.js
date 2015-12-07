function View3(Observer){
	var view={};
	var margin;
	var x,y,dradding,line,axis,background,foreground;
	var svg1;
	
	var width=$("div#view1a").width();//1350*37%=499
	var height=$("div#view1a").width()*1.1;
	$("div#view1a").css("height",height);
	$("div#v1await").css("height",height);
	
	var winWidth;
	var winHeight;
	if (window.innerWidth)
	winWidth = window.innerWidth;
	else if ((document.body) && (document.body.clientWidth))
	winWidth = document.body.clientWidth;
	if (window.innerHeight)
	winHeight = window.innerHeight;
	else if ((document.body) && (document.body.clientHeight))
	winHeight = document.body.clientHeight;

	init();
	/*window.onresize=function()
	{
		location.reload();
	}*/
		line = d3.svg.line();
		axis = d3.svg.axis().orient("left");
		background;
		foreground;

		svg1 = d3.select("#View3").append("svg")
		.attr("width", width + margin.left + margin.right)
		.attr("height", height + margin.top + margin.bottom)
		.append("g")
		.attr("transform", "translate(" + margin.left + "," + margin.top + ")");

		fri();
		document.getElementById("frinum").onclick=fri;
		document.getElementById("satnum").onclick=sat;
		document.getElementById("sunnum").onclick=sun
	}
	
	
	
	view.onMessage = function(message, data, from){
		if(message == "selectPeople"){
			if(from != view){
			
			}
			else 
			{
				onSelectPeople();
			}
		}
	}
	
	
	
	function onSelectPeople(){
		return array;
	}
	
	function position(d) {
	var v = dragging[d];
	return v == null ? x(d) : v;
	}

	function transition(g) {
	return g.transition().duration(500);
	}

	// Returns the path for a given data point.
	function path(d) {
  
	return line(dimensions.map(function(p) { return [position(p), y[p](d[p])]; }));
	}

	function brushstart() {
	d3.event.sourceEvent.stopPropagation();
	}
	
	var array=[];
	// Handles a brush event, toggling the display of foreground lines.
	function brush() {
		var actives = dimensions.filter(function(p) { return !y[p].brush.empty(); }),
		extents = actives.map(function(p) { return y[p].brush.extent(); });
		array=[];
		foreground.style("display", function(d) {
		return actives.every(function(p, i) {
		if(extents[i][0] <= d[p] && d[p] <= extents[i][1])
		{
			array.push(parseInt(d.id));
			
		}
		
		return extents[i][0] <= d[p] && d[p] <= extents[i][1];
	  
		}) ? null : "none";
		});
	}
	function brushend()
	{
		console.log("aaaaa");
		console.log(array);
		Observer.fireEvent("showPath",array,view);
	}
function fri()
{
svg1.selectAll("g").remove();

d3.csv("data/dfFri.csv", function(error, wine) {

  // Extract the list of dimensions and create a scale for each.
  x.domain(dimensions = d3.keys(wine[0]).filter(function(d) {
    return d!=""&&d!="id"&&d!="num"&&d!="num67"&&d!="stay67"&&d!="num643"&&d!="stay643"&&d!="num1649"&&d!="stay1649"&&d!="num1666"&&d!="stay1666"&&d!="num1743"&&d!="stay1743"&&d!="num1767"&&d!="stay1767"&&d!="num2354"&&d!="stay2354"&&d!="num2659"&&d!="stay2659"&&d!="num2715"&&d!="stay2715"&&d!="num2866"&&d!="stay2866"&&d!="num3233"&&d!="stay3233"&&d!="num3468"&&d!="stay3468"&&d!="num3890"&&d!="stay3890"&&d!="num4237"&&d!="stay4237"&&d!="num4356"&&d!="stay4356"&&d!="num4378"&&d!="stay4378"&&d!="num4524"&&d!="stay4524"&&d!="num4711"&&d!="stay4711"&&d!="num4887"&&d!="stay4887"&&d!="num5057"&&d!="stay5057"&&d!="num6037"&&d!="stay6037"&&d!="num6399"&&d!="stay6399"&&d!="num6737"&&d!="stay6737"&&d!="num6944"&&d!="stay6944"&&d!="num7379"&&d!="stay7379"&&d!="num7384"&&d!="stay7384"&&d!="num7622"&&d!="stay7622"&&d!="num7688"&&d!="stay7688"&&d!="num7837"&&d!="stay7837"&&d!="num7848"&&d!="stay7848"&&d!="num7987"&&d!="stay7987"&&d!="num7989"&&d!="stay7989"&&d!="num8177"&&d!="stay8177"&&d!="num8280"&&d!="stay8280"&&d!="num8388"&&d!="stay8388"&&d!="num8586"&&d!="stay8586"&&d!="num8644"&&d!="stay8644"&&d!="num8748"&&d!="stay8748"&&d!="num8763"&&d!="stay8763"&&d!="num8781"&&d!="stay8781"&&d!="num9281"&&d!="stay9281"&&d!="num9977"&&d!="stay9977" && (y[d] = d3.scale.linear()
        .domain(d3.extent(wine, function(p) { return +p[d]; }))
        .range([height, 0]));
  }));

  // Add grey background lines for context.
  background = svg1.append("g")
      .attr("class", "background")
    .selectAll("path")
      .data(wine)
    .enter().append("path")
      .attr("d", path);

  // Add blue foreground lines for focus.
  foreground = svg1.append("g")
      .attr("class", "foreground")
    .selectAll("path")
      .data(wine)
    .enter().append("path")
      .attr("d", path);
	  
	  

  // Add a group element for each dimension.
  var g = svg1.selectAll(".dimension")
      .data(dimensions)
    .enter().append("g")
      .attr("class", "dimension")
      .attr("transform", function(d) { return "translate(" + x(d) + ")"; })
      .call(d3.behavior.drag()
        .origin(function(d) { return {x: x(d)}; })
        .on("dragstart", function(d) {
          dragging[d] = x(d);
          background.attr("visibility", "hidden");
        })
        .on("drag", function(d) {
          dragging[d] = Math.min(width, Math.max(0, d3.event.x));
          foreground.attr("d", path);
          dimensions.sort(function(a, b) { return position(a) - position(b); });
          x.domain(dimensions);
          g.attr("transform", function(d) { return "translate(" + position(d) + ")"; })
        })
        .on("dragend", function(d) {
          delete dragging[d];
          transition(d3.select(this)).attr("transform", "translate(" + x(d) + ")");
          transition(foreground).attr("d", path);
          background
              .attr("d", path)
            .transition()
              .delay(500)
              .duration(0)
              .attr("visibility", null);
        }));

  // Add an axis and title.
  g.append("g")
      .attr("class", "axis")
      .each(function(d) { d3.select(this).call(axis.scale(y[d])); })
      .append("text")
      .style("text-anchor", "middle")
      .attr("y", -9)
      .text(function(d) { return d; });

  // Add and store a brush for each axis.
  g.append("g")
      .attr("class", "brush")
      .each(function(d) {
        d3.select(this).call(y[d].brush = d3.svg.brush().y(y[d]).on("brushstart", brushstart).on("brush", brush).on("brushend", brushend));
      })
    .selectAll("rect")
      .attr("x", -8)
      .attr("width", 16);
	  
	 
});
}

function sat()
{
svg1.selectAll("g").remove();

d3.csv("data/dfSat.csv", function(error, wine) {

  // Extract the list of dimensions and create a scale for each.
  x.domain(dimensions = d3.keys(wine[0]).filter(function(d) {
    return d!=""&&d!="id"&&d!="num"&&d!="num67"&&d!="stay67"&&d!="num643"&&d!="stay643"&&d!="num1649"&&d!="stay1649"&&d!="num1666"&&d!="stay1666"&&d!="num1743"&&d!="stay1743"&&d!="num1767"&&d!="stay1767"&&d!="num2354"&&d!="stay2354"&&d!="num2659"&&d!="stay2659"&&d!="num2715"&&d!="stay2715"&&d!="num2866"&&d!="stay2866"&&d!="num3233"&&d!="stay3233"&&d!="num3468"&&d!="stay3468"&&d!="num3890"&&d!="stay3890"&&d!="num4237"&&d!="stay4237"&&d!="num4356"&&d!="stay4356"&&d!="num4378"&&d!="stay4378"&&d!="num4524"&&d!="stay4524"&&d!="num4711"&&d!="stay4711"&&d!="num4887"&&d!="stay4887"&&d!="num5057"&&d!="stay5057"&&d!="num6037"&&d!="stay6037"&&d!="num6399"&&d!="stay6399"&&d!="num6737"&&d!="stay6737"&&d!="num6944"&&d!="stay6944"&&d!="num7379"&&d!="stay7379"&&d!="num7384"&&d!="stay7384"&&d!="num7622"&&d!="stay7622"&&d!="num7688"&&d!="stay7688"&&d!="num7837"&&d!="stay7837"&&d!="num7848"&&d!="stay7848"&&d!="num7987"&&d!="stay7987"&&d!="num7989"&&d!="stay7989"&&d!="num8177"&&d!="stay8177"&&d!="num8280"&&d!="stay8280"&&d!="num8388"&&d!="stay8388"&&d!="num8586"&&d!="stay8586"&&d!="num8644"&&d!="stay8644"&&d!="num8748"&&d!="stay8748"&&d!="num8763"&&d!="stay8763"&&d!="num8781"&&d!="stay8781"&&d!="num9281"&&d!="stay9281"&&d!="num9977"&&d!="stay9977" && (y[d] = d3.scale.linear()
        .domain(d3.extent(wine, function(p) { return +p[d]; }))
        .range([height, 0]));
  }));

  // Add grey background lines for context.
  background = svg1.append("g")
      .attr("class", "background")
    .selectAll("path")
      .data(wine)
    .enter().append("path")
      .attr("d", path);

  // Add blue foreground lines for focus.
  foreground = svg1.append("g")
      .attr("class", "foreground")
    .selectAll("path")
      .data(wine)
    .enter().append("path")
      .attr("d", path);
	  
	  

  // Add a group element for each dimension.
  var g = svg1.selectAll(".dimension")
      .data(dimensions)
    .enter().append("g")
      .attr("class", "dimension")
      .attr("transform", function(d) { return "translate(" + x(d) + ")"; })
      .call(d3.behavior.drag()
        .origin(function(d) { return {x: x(d)}; })
        .on("dragstart", function(d) {
          dragging[d] = x(d);
          background.attr("visibility", "hidden");
        })
        .on("drag", function(d) {
          dragging[d] = Math.min(width, Math.max(0, d3.event.x));
          foreground.attr("d", path);
          dimensions.sort(function(a, b) { return position(a) - position(b); });
          x.domain(dimensions);
          g.attr("transform", function(d) { return "translate(" + position(d) + ")"; })
        })
        .on("dragend", function(d) {
          delete dragging[d];
          transition(d3.select(this)).attr("transform", "translate(" + x(d) + ")");
          transition(foreground).attr("d", path);
          background
              .attr("d", path)
            .transition()
              .delay(500)
              .duration(0)
              .attr("visibility", null);
        }));

  // Add an axis and title.
  g.append("g")
      .attr("class", "axis")
      .each(function(d) { d3.select(this).call(axis.scale(y[d])); })
      .append("text")
      .style("text-anchor", "middle")
      .attr("y", -9)
      .text(function(d) { return d; });

  // Add and store a brush for each axis.
  g.append("g")
      .attr("class", "brush")
      .each(function(d) {
        d3.select(this).call(y[d].brush = d3.svg.brush().y(y[d]).on("brushstart", brushstart).on("brush", brush).on("brushend", brushend));
      })
    .selectAll("rect")
      .attr("x", -8)
      .attr("width", 16);
	  
	 
});
}

function sun()
{
svg1.selectAll("g").remove();

d3.csv("data/dfSun.csv", function(error, wine) {

  // Extract the list of dimensions and create a scale for each.
  x.domain(dimensions = d3.keys(wine[0]).filter(function(d) {
    return d!=""&&d!="id"&&d!="num"&&d!="num67"&&d!="stay67"&&d!="num643"&&d!="stay643"&&d!="num1649"&&d!="stay1649"&&d!="num1666"&&d!="stay1666"&&d!="num1743"&&d!="stay1743"&&d!="num1767"&&d!="stay1767"&&d!="num2354"&&d!="stay2354"&&d!="num2659"&&d!="stay2659"&&d!="num2715"&&d!="stay2715"&&d!="num2866"&&d!="stay2866"&&d!="num3233"&&d!="stay3233"&&d!="num3468"&&d!="stay3468"&&d!="num3890"&&d!="stay3890"&&d!="num4237"&&d!="stay4237"&&d!="num4356"&&d!="stay4356"&&d!="num4378"&&d!="stay4378"&&d!="num4524"&&d!="stay4524"&&d!="num4711"&&d!="stay4711"&&d!="num4887"&&d!="stay4887"&&d!="num5057"&&d!="stay5057"&&d!="num6037"&&d!="stay6037"&&d!="num6399"&&d!="stay6399"&&d!="num6737"&&d!="stay6737"&&d!="num6944"&&d!="stay6944"&&d!="num7379"&&d!="stay7379"&&d!="num7384"&&d!="stay7384"&&d!="num7622"&&d!="stay7622"&&d!="num7688"&&d!="stay7688"&&d!="num7837"&&d!="stay7837"&&d!="num7848"&&d!="stay7848"&&d!="num7987"&&d!="stay7987"&&d!="num7989"&&d!="stay7989"&&d!="num8177"&&d!="stay8177"&&d!="num8280"&&d!="stay8280"&&d!="num8388"&&d!="stay8388"&&d!="num8586"&&d!="stay8586"&&d!="num8644"&&d!="stay8644"&&d!="num8748"&&d!="stay8748"&&d!="num8763"&&d!="stay8763"&&d!="num8781"&&d!="stay8781"&&d!="num9281"&&d!="stay9281"&&d!="num9977"&&d!="stay9977" && (y[d] = d3.scale.linear()
        .domain(d3.extent(wine, function(p) { return +p[d]; }))
        .range([height, 0]));
  }));

  // Add grey background lines for context.
  background = svg1.append("g")
      .attr("class", "background")
    .selectAll("path")
      .data(wine)
    .enter().append("path")
      .attr("d", path);

  // Add blue foreground lines for focus.
  foreground = svg1.append("g")
      .attr("class", "foreground")
    .selectAll("path")
      .data(wine)
    .enter().append("path")
      .attr("d", path);
	  
	  

  // Add a group element for each dimension.
  var g = svg1.selectAll(".dimension")
      .data(dimensions)
    .enter().append("g")
      .attr("class", "dimension")
      .attr("transform", function(d) { return "translate(" + x(d) + ")"; })
      .call(d3.behavior.drag()
        .origin(function(d) { return {x: x(d)}; })
        .on("dragstart", function(d) {
          dragging[d] = x(d);
          background.attr("visibility", "hidden");
        })
        .on("drag", function(d) {
          dragging[d] = Math.min(width, Math.max(0, d3.event.x));
          foreground.attr("d", path);
          dimensions.sort(function(a, b) { return position(a) - position(b); });
          x.domain(dimensions);
          g.attr("transform", function(d) { return "translate(" + position(d) + ")"; })
        })
        .on("dragend", function(d) {
          delete dragging[d];
          transition(d3.select(this)).attr("transform", "translate(" + x(d) + ")");
          transition(foreground).attr("d", path);
          background
              .attr("d", path)
            .transition()
              .delay(500)
              .duration(0)
              .attr("visibility", null);
        }));

  // Add an axis and title.
  g.append("g")
      .attr("class", "axis")
      .each(function(d) { d3.select(this).call(axis.scale(y[d])); })
      .append("text")
      .style("text-anchor", "middle")
      .attr("y", -9)
      .text(function(d) { return d; });

  // Add and store a brush for each axis.
  g.append("g")
      .attr("class", "brush")
      .each(function(d) {
        d3.select(this).call(y[d].brush = d3.svg.brush().y(y[d]).on("brushstart", brushstart).on("brush", brush).on("brushend", brushend));
      })
    .selectAll("rect")
      .attr("x", -8)
      .attr("width", 16);
	  
	 
});
}

	return view;
}

