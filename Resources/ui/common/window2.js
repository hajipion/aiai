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
		layout: 'vertical',
		top: 0,
		height: '30%',
		width: '100%',
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
		borderStyle: Ti.UI.INPUT_BORDERSTYLE_ROUNDED
	});
	// 目的地のテキストフィールド
	var tfDestination = Ti.UI.createTextField({
		color: "#333",
		hintText: "目的地",
		height: 'auto',
		width: '60%',
		borderStyle: Ti.UI.INPUT_BORDERSTYLE_ROUNDED
	});
	// ヘルプボタン
	var sbmbutton = Ti.UI.createButton({
		title: "HELP!",
		width: '100%',
		height: 'auto'
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

	view.add(map);
	map.add(view_search);
	view_search.add(tfPresent);
	view_search.add(tfDestination);
	view_search.add(sbmbutton);
	
	win.add(view);

	return win;
}

module.exports = Window2;