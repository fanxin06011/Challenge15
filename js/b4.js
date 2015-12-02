$(document).ready(function(){
  $(function() {
    $( "div#view1b2" ).draggable();
	$( "div#view1a2" ).draggable();
  });

  $(function() {
    $( "div#view4" ).draggable();
  });

  $("div#view1a").hide();
  $("div#view1b2").hide();
  $("div#view1a2").hide();
  $("button#view1change").click(function(){
	  $("div#view1a").toggle();
	  $("div#view1b").toggle();
	  $("div#view1b2").hide();
  });
  $("button#viewb2close").click(function(){
	  $("div#view1b2").hide();
  });

  $("button#viewa2close").click(function(){
	  $("div#view1a2").hide();
  });
  
});
//window.onload=function(){   alert("bbbbbbbb"); } 