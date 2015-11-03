$(document).ready(function(){
  $("div#view1b").hide();
  $("button#view1change").click(function(){
	  $("div#view1a").toggle();
	  $("div#view1b").toggle();
  });
});
//window.onload=function(){   alert("bbbbbbbb"); } 