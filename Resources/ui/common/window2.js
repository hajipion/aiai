function Window2(title){
	
	var win = Ti.UI.createWindow({
		title: title
	});	
	
	// base view
	var view = Ti.UI.createView({
		// layout: 'vertical'
	});
	
	if(!Titanium.Geolocation.locationServicesEnabled){
        Titanium.UI.createAlertDialog({
            title:'位置情報取得',
            message:'位置測定が出来ません。電波状況、設定を確認してください。'
        }).show();
        return;
    }
    /*
	// 現在位置
	var my_place = Ti.Map.createAnnotation({
		title: "現在地",
		pinImage: "/images/map-pin.png",
		animate: true
	});

	// マップエリア
	var map = Ti.Map.createView({
		mapType: Ti.Map.STANDARD_TYPE,
		animate: true,
		regionFit: true,
		top: 0,
		width: 'auto',
		annotations: [my_place],
		height: 'auto'
	});*/
	
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
		editable: false,
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
	
	// 最初に中心となる位置をセットしておく
	var mapview = Ti.Map.createView({
 		mapType: Ti.Map.STANDARD_TYPE,
 		region: {latitude:35.6911, longitude:139.7067, latitudeDelta:0.01, longitudeDelta:0.01},
 		animate: true,
 		regionFit: true,
 		width: 'auto',
 		height: 'auto'
	});

	view.add(mapview);
	win.add(view);

	Titanium.Geolocation.purpose = 'サンプル';

	Titanium.Geolocation.getCurrentPosition(
 		function(e) {
  			if(!e.success || e.error){
   				//alert('位置情報が取得できませんでした');
   				return;
  			}
  			// 現在地をセット
  			latitude = e.coords.latitude;
        	longitude = e.coords.longitude;
        	
        	tfPresent.setHintText('緯度：'+latitude+'　経度：'+longtitude);
  
	  		// 現在地を動的に表示する
  			var currentPos = Titanium.Map.createAnnotation({
   				latitude: latitude, 
   				longitude: longitude, 
   				pincolor: Titanium.Map.ANNOTATION_RED,
   				pinImage: "/images/map-pin.png",
   				animate: true
  			});
     		mapview.addAnnotation(currentPos);
        	mapview.show(); // 隠していた地図を表示する
        	mapview.setLocation({   // 現在地まで地図をスクロールする
            	latitude:latitude,
            	longitude:longitude,
            	latitudeDelta:0.01,
            	longitudeDelta:0.01
        	});
 		}
	);
	// view.add(map);
	view.add(view_search);
	view_search.add(tfPresent);
	view_search.add(tfDestination);
	view_search.add(sbmbutton);
	
	win.add(view);

	return win;
}

module.exports = Window2;