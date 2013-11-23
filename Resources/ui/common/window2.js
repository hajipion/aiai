function Window2(title){
	
	var win = Ti.UI.createWindow({
		title: title
	});
	
	// base view
	var view = Ti.UI.createView({
		// layout: 'vertical'
	});
	// 場所指定
	var ebisu = Ti.Map.createAnnotation({
		latitude: 35.645,
		longitude: 139.71,
		title: "Ebisu",
		pinImage: "/images/map-pin.png",
		animate: true
	});
	
	// マップエリア
	var map = Ti.Map.createView({
		mapType: Ti.Map.STANDARD_TYPE,
		region: {latitude: 35.645, longitutde: 139.71, latitudeDelta:0.01, longitudeDelta:0.01},
		animate: true,
		regionFit: true,
		top: 0,
		width: 'auto',
		annotations: [ebisu],
		height: 'auto'
	});
	// サーチエリア
	var view_search = Ti.UI.createView({
		layout: 'vertical',
		top: 0,
		height: '40%',
		width: 'auto',
		backgroundColor: '#000',
		opacity: 0.5
	});
	// 現在地のテキストフィールド
	var tfPresent = Ti.UI.createTextField({
		color: "#333",
		hintText: "現在地",
		width: '60%',
		top: 10,
		borderStyle: Ti.UI.INPUT_BORDERSTYLE_ROUNDED
	});
	// 目的地のテキストフィールド
	var tfDestination = Ti.UI.createTextField({
		color: "#333",
		hintText: "目的地",
		width: '60%',
		top: 10,
		borderStyle: Ti.UI.INPUT_BORDERSTYLE_ROUNDED
	});
	// ヘルプボタン
	var sbmbutton = Ti.UI.createButton({
		top: 10,
		width: 55,
		height: 55,
		backgroundImage: '/images/help.png',
		opacity:1
	});
	// アラート
	var alert = Ti.UI.createAlertDialog({
		title: "HELP?",
		message: "近くの人に助けを求めますか？",
		buttonNames: ["OK","Cancel"],
		cancel: 1
	});
	sbmbutton.addEventListener("click",function(e){
		alert.show();
	});
	
	var view1 = Ti.UI.createView({
		//layout: 'vertical',
		top: 200,
		height: '50%',
		width: 'auto',
		backgroundColor: '#000',
		//opacity: 0.5
	});

	view.add(map);
	// map.add(view1);
	view.add(view_search);
	view_search.add(tfPresent);
	view_search.add(tfDestination);
	view_search.add(sbmbutton);
	
	win.add(view);

	return win;
}

module.exports = Window2;