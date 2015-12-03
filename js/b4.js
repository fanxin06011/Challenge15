$(document).ready(function(){
  $(function() {
    $( "div#viewb2outer" ).draggable();
	$( "div#va2outer" ).draggable();
  });

  $(function() {
    $( "div#view4" ).draggable();
  });

  $("div#view1a").hide();
  //$("#v1await").hide();
  $("div#viewb2outer").hide();
  $("div#va2outer").hide();
  $("#view1change").click(function(){
	  if(document.getElementById("view1change").value=="show track"){
		document.getElementById("view1change").value="show attraction";
	  }else{
		document.getElementById("view1change").value="show track";
	  }
	  $("div#view1a").toggle();
	  $("div#view1b").toggle();
	  $("div#viewb2outer").hide();
  });
  $("#viewb2close").click(function(){
	  $("div#viewb2outer").hide();
  });


  $("#viewa2close").click(function(){
	$("div#va2outer").hide();
  });

  
});
