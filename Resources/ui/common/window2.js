function Window2(title){
	
	var win = Ti.UI.createWindow({
		title: title
	});
	
	// base view 
	var view = Ti.UI.createView({
		layout: 'vertical'
	});

	//　マップためしてみた
	var ebisu = Ti.Map.createAnnotation({
		latitude: 35.645,
		longitude: 139.71,
		title: "Ebisu",
		animate: true
	});
	var map = Ti.Map.createView({
		mapType: Ti.Map.STANDARD_TYPE,
		region: {latitude: 35.645, longitutde: 139.71, latitudeDelta:0.01, longitudeDelta:0.01},
		animate: true,
		regionFit: false,
		top: '10%',
		width: 'auto',
		height: '90%'
	});
	
	var view_search = Ti.UI.createView({
		layout: 'horizontal',
		top: 0,
		height: '10%'
	});
	var tf = Ti.UI.createTextField({
		color: "#333",
		hintText: "name",
		height: 'auto',
		width: '70%',
		borderStyle: Ti.UI.INPUT_BORDERSTYLE_ROUNDED
	});
	var sbmbutton = Ti.UI.createButton({
		title: "Submit!",
		width: '30%',
		height: 'auto'
	});
	sbmbutton.addEventListener("click",function(e){
		Ti.API.info(tf.getValue());
	});

	view.add(view_search);
	view_search.add(tf);
	view_search.add(sbmbutton);
	view.add(map);
	
	win.add(view);

	return win;
}

module.exports = Window2;