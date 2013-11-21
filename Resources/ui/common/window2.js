function Window2(title){
	
	var win = Ti.UI.createWindow({
		title: title
	});
	
	// base view 
	var view = Ti.UI.createView({
		layout: 'vertical'
	});
	/* 場所指定
	var ebisu = Ti.Map.createAnnotation({
		latitude: 35.645,
		longitude: 139.71,
		title: "Ebisu",
		animate: true
	});
	*/
	// マップエリア
	var map = Ti.Map.createView({
		mapType: Ti.Map.STANDARD_TYPE,
		region: {latitude: 35.645, longitutde: 139.71, latitudeDelta:0.01, longitudeDelta:0.01},
		animate: true,
		regionFit: false,
		top: 0,
		width: 'auto',
		height: '100%'
	});
	// サーチエリア
	var view_search = Ti.UI.createView({
		layout: 'horizontal',
		top: 0,
		height: '30%',
		backgroundColor: '#000',
		opacity: 0.5
	});
	// 現在地のテキストフィールド
	var tfPresent = Ti.UI.createTextField({
		color: "#333",
		hintText: "現在地",
		height: 'auto',
		width: '60%',
		top: 10,
		left: 60,
		borderStyle: Ti.UI.INPUT_BORDERSTYLE_ROUNDED
	});
	// 目的地のテキストフィールド
	var tfDestination = Ti.UI.createTextField({
		color: "#333",
		hintText: "目的地",
		height: 'auto',
		width: '60%',
		top: 10,
		left: 60,
		borderStyle: Ti.UI.INPUT_BORDERSTYLE_ROUNDED
	});
	// ヘルプボタン
	var sbmbutton = Ti.UI.createButton({
		title: "Submit!",
		width: '60%',
		height: 'auto'
	});
	sbmbutton.addEventListener("click",function(e){
		Ti.API.info(tf.getValue());
	});

	view.add(map);
	map.add(view_search);
	view_search.add(tfPresent);
	view_search.add(tfDestination);
	view_search.add(sbmbutton);
	
	win.add(view);

	return win;
}

module.exports = Window2;