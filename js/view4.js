(function(){
function View4(Observer){
	var view4={};
	var num=1;
	var idlist=[];
	//var idlist=[629048, 1486047, 1690685, 1797150] 
	var idlisttmp=[];
	var idhighlight=[];
	view4.onMessage = function(message, data, from){
			if(message == "showPath"){
				if(from != view4){
					//changelist(data);
					idlisttmp=data;
					$("input#file").attr("flag","0");
					//$("button#add").click();
				}
			}
			if(message == "highlightstart"){
				if(from != view4){
					console.log("view4 highlightstart "+data);
					$("fieldset#list p").css("background-color","white");
					for(var i=0;i<data.length;i++){
						$("fieldset#list p").filter("#"+data[i]).css("background-color","yellow");
					}
					
				}
			}
			if(message == "highlightend"){
				if(from != view4){
					console.log("view4 highlightend "+data);
					for(var i=0;i<data.length;i++){
						$("fieldset#list p").filter("#"+data[i]).css("background-color","white");
					}
				}
			}
	}

	$("input#add").click(add);
	
	function add(){
		
	  if($("input#file").attr("flag")=="1"){
		  var aaa=[];
		  idlist=[];
		  aaa=$("input#file").attr("ls").split(",");
		  for(var i=0;i<aaa.length;i++){
			  idlist.push(+aaa[i]);
		  }
		  idlisttmp=[];
		  //console.log(idlist);
		  //idlisttmp=$("input#file").attr("ls").split(",");
		  $("input#file").attr("flag","0");
		  //console.log($("input#file").attr("flag"));
		  
	  }else{
		  idlist=_.union(idlist,idlisttmp);
	  }
	  
	  
	  
	  $("fieldset#list").children("p").remove();
	  for(var i=0;i<idlist.length;i++){
		  $("fieldset#list").append("<p>"+idlist[i]+"</p>");
		  $("fieldset#list p:last").attr("id",+idlist[i]);
		  $("fieldset#list p:last").css("background-color","white");
		  $("fieldset#list p:last").addClass("idlistp");
		  //$("fieldset#list p:last").append('<input type="button" class="deleteid" value="delete">');
		  $("fieldset#list p:last").append('<a><i class="fa fa-remove"></i></a>');
		  $(".deleteid:last").click(function(){
				var d=parseInt($(this).parent("p").attr("id"));
				Observer.fireEvent("highlightend", [+$(this).parent("p").attr("id")], view4);
				$(this).parent("p").remove();
				idlist=_.without(idlist,d);
				console.log(idlist);
			});
			/*
		  $("fieldset#list p:last").mouseover(function(){
			  $(this).css("background-color","yellow");
			  //console.log($(this).attr("id"));
			  Observer.fireEvent("highlightstart", [+$(this).attr("id")], view4);
		  });
		  $("fieldset#list p:last").mouseout(function(){
			  $(this).css("background-color","white");
			  //console.log($(this).attr("id"));
			  Observer.fireEvent("highlightend", [+$(this).attr("id")], view4);
		  });
		  */
		  
		  $("fieldset#list p:last").click(function(){
			  if($(this).css("background-color")=="rgb(255, 255, 0)"){
				  $(this).css("background-color","white");
				  idhighlight=_.without(idhighlight,parseInt($(this).attr("id")));
				  //console.log("idhighlight  "+idhighlight);
				  Observer.fireEvent("highlightstart", idhighlight, "view4");
				  console.log("view4 highlight");
			  }else{
				  $(this).css("background-color","yellow");
				  idhighlight.push(parseInt($(this).attr("id")));
				  //console.log("idhighlight  "+idhighlight);
				  Observer.fireEvent("highlightstart", idhighlight, "view4");
				  console.log("view4 highlight");
			  }
		  });
	  }
	}
	
	
	
	$("#clear").click(function(){
		//console.log("clear");
	  idlist=[];
	  $("fieldset#list").children("p").remove();
	  Observer.fireEvent("highlightend", idhighlight, "view4");
	});
	$("#v4submit").click(function(){
	  //console.log("aaaa");
	  $("div#view1a2").show();
	  Observer.fireEvent("showPath", idlist, "view4");
	  $("#viewa2draw").click();
	  
	});
	
	
	function saveAs(blob, filename) {
		var type = blob.type;
		var force_saveable_type = 'application/octet-stream';
		if (type && type != force_saveable_type) { // ǿ׆Ђ՘ì׸؇՚䰀F󖐴򿪍
			var slice = blob.slice || blob.webkitSlice || blob.mozSlice;
			blob = slice.call(blob, 0, blob.size, force_saveable_type);
		}

		var url = URL.createObjectURL(blob);
		var save_link = document.createElementNS('http://www.w3.org/1999/xhtml', 'a');
		save_link.href = url;
		save_link.download = filename;

		var event = document.createEvent('MouseEvents');
		event.initMouseEvent('click', true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
		save_link.dispatchEvent(event);
		URL.revokeObjectURL(url);
	}
	
	
	$("#save").click(function(){
		var textBlob1 = new Blob([idlist.toString()], { type: "text/plain"});
	    saveAs(textBlob1,num+'.txt');
	    num=num+1;
	});





	Observer.addView(view4);
	return view4;
	}
	window["View4"] = View4;
}
)()