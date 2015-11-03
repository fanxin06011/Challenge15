(
function (){
	var obs = Observer();

	var view1a = View1a(obs);
	var view1b = View1b(obs);
	var view2 = View2(obs);
	obs.addView(view1a);
	obs.addView(view1b);
	obs.addView(view2);
	//obs.fireEvent("selectscene", 1 ,"view1")
	//obs.fireEvent("showPath", ["577530","1204869"] ,"view3")
	
	var obs = Observer();
	var view3 = View3(obs);
}


)()

