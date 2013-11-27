function Window2(title){
	
	/*
	 * ヘルプボタンが押されたらユーザに通知
	 * 他ユーザから助けるよ通知もらったらソケット通信開始
	 * ソケット通信でJSONが送られてきたらユーザ全員の位置を表示
	 * 完了ボタン(未)押したら通信終了。全員に通知。
	 * あとは？
	 */

	var win = Ti.UI.createWindow({
		title: title
	});

	// View ////////////////////////////////////////////////////////////
	var view = Ti.UI.createView({
		// layout: 'vertical'
	});
	
	// サーチエリア
	var view_search = Ti.UI.createView({
		layout: 'vertical',
		top: 0,
		height: '40%',
		width: 'auto',
		backgroundColor: '#000',
		opacity: 0.7
	});
	
	// 現在地のテキストフィールド
	var tfPresent = Ti.UI.createTextField({
		color: "#333",
		hintText: "現在地",
		width: '60%',
		height: '25%',
		top: 10,
		editable: false,
		borderStyle: Ti.UI.INPUT_BORDERSTYLE_ROUNDED
	});
	
	// 目的地のテキストフィールド
	var tfDestination = Ti.UI.createTextField({
		color: "#333",
		hintText: "目的地を入力",
		width: '60%',
		height: '25%',
		top: 10,
		borderStyle: Ti.UI.INPUT_BORDERSTYLE_ROUNDED
	});
	
	// ヘルプボタン
	var sbmbutton = Ti.UI.createButton({
		width: 55,
		height: 55,
		backgroundImage: '/images/help.png',
		opacity:1
	});
	sbmbutton.addEventListener("click",function(e){
		if(tfDestination.getValue()===''){
			alert.setTitle('HELPする前に！');
			alert.setMessage('目的地を入力してください。');
			alert.show();
		} else {
			alert.setTitle('HELP?');
			alert.setMessage('近くの人に助けを求めますか？');
			alert.show();
		}
	});
	
	// 閉じるボタン
	var closeBtn = Ti.UI.createButton({
		width: 30,
		height: 30,
		right: 10,
		backgroundImage: '/images/close.png',
		opacity:1
	});
	closeBtn.addEventListener("click",function(e){
		// view_searchを非表示に
		view_search.visible = false;
		// pullBtnを表示
		pullBtn.visible = true;
	});
	
	var view_buttons = Ti.UI.createView({
		top: 10,
		height: '25%',
		width: '100%'
	});
	view_buttons.add(sbmbutton);
	view_buttons.add(closeBtn);

	view_search.add(tfPresent);
	view_search.add(tfDestination);
	view_search.add(view_buttons);
	// view_search.add(closeBtn);
	
	// プルボタン
	var pullBtn = Ti.UI.createButton({
		visible: false,
		top: 0,
		width: '15%',
		right: 10,
		backgroundImage: '/images/arrow-under.png',
		opacity:1
	});
	pullBtn.addEventListener("click",function(e){
		// pullBtnを非表示に
		pullBtn.visible = false;
		// view_searchを表示に
		view_search.visible = true;
	});
	
	// map
	var mapview = Ti.Map.createView({
 		mapType: Ti.Map.STANDARD_TYPE,
 		region: {latitude:35.681382, longitude:139.76608, latitudeDelta:0.01, longitudeDelta:0.01},
 		animate: true,
 		regionFit: true,
 		width: 'auto',
 		height: 'auto'
	});
	
	view.add(mapview);
	view.add(view_search);
	view.add(pullBtn);
	win.add(view);
	
	// アラート
	var alert = Ti.UI.createAlertDialog({
		//title: "HELP?",
		//message: "近くの人に助けを求めますか？",
		buttonNames: ["OK","Cancel"],
		cancel: 1
	});
	alert.addEventListener('click',function(event){
	    if(event.cancel){

	    }
	    // 選択されたボタンのindexも返る
	    if(event.index == 0){
	      	var io = require('ui/common/socketio-titanium');
			var socket = io.connect('202.181.102.188:8080');
			
			socket.emit("message", "hello world");
			socket.on("message", function (data){
				//Ti.API.info('got message: ' + data);
				socket.emit("message", data + "again");
			});
	    }
	});

	// use geolocation ////////////////////////////////////////////////////
	// check locationService 
	if(!Titanium.Geolocation.locationServicesEnabled){
        var alt = Titanium.UI.createAlertDialog({
            title:'位置情報取得',
            message:'位置測定が出来ません。電波状況、設定を確認してください。'
        });
        alt.show();
        return;
    }
	
	// setting
	Ti.Geolocation.purpose = 'Get Current Location';
    Ti.Geolocation.accuracy = Ti.Geolocation.ACCURACY_BEST;
    Ti.Geolocation.distanceFilter = 5;
    Ti.Geolocation.preferredProvider = Ti.Geolocation.PROVIDER_GPS;
    
    if(Titanium.Platform.name == 'android'){
		var providerGps = Ti.Geolocation.Android.createLocationProvider({
		    name: Ti.Geolocation.PROVIDER_GPS,
	    	minUpdateDistance: 5.0,
	    	minUpdateTime: 5
		});
		Ti.Geolocation.Android.addLocationProvider(providerGps);
		Ti.Geolocation.Android.manualMode = true;
	}
	
	// ユーザの位置情報オブジェクトを作成
	var user_place = {
		name: Ti.App._user,
		latitude: 0.0,
		longtitude: 0.0
	};
	
	// 現在地を動的に表示する
  	var currentPos = Titanium.Map.createAnnotation({
   		pincolor: Titanium.Map.ANNOTATION_RED,
   		pinImage: "/images/red-circle.png",
   		animate: true
  	});
		
	// event 'location' callback this function 
	var locationCallback = function(e) {
    	if(!e.success || e.error){
   				//alert('位置情報が取得できませんでした');
   				//alert.show();
   				return;
  			}
    	var latitude = e.coords.latitude;
    	var longitude = e.coords.longitude;

		user_place.latitude = latitude;
		user_place.longitude = longitude;
		//sendLocation();
    	// 小数点第二位に省略
        var shortLatitude = Math.round(user_place.latitude * 100) / 100;
        var shortLongitude = Math.round(user_place.longitude * 100) / 100;

		tfPresent.setValue(''+user_place.latitude);
		tfDestination.setValue(''+user_place.longitude);
		currentPos.latitude=latitude;
		currentPos.longitude=longitude;
	  		
     	mapview.addAnnotation(currentPos);
        mapview.show(); // 隠していた地図を表示する
        mapview.setLocation({   // 現在地まで地図をスクロールする
            latitude:latitude,
            longitude:longitude,
            animate:true,
            latitudeDelta:0.01,
            longitudeDelta:0.01
        });
	};
	
	// 位置情報を送信
	var sendLocation = function(){
		var io = require('ui/common/socketio-titanium');
			var socket = io.connect('202.181.102.188:8080');
			
			socket.emit("message", JSON.stringify(user_place));
			// event handler (recieve)
			socket.on("message", function (data){
				// たぶんここでJSON受け取ってみんなの位置を表示せなあかんのかな？(sendlocationの中じゃないだろうけど)
			});
	};

	Titanium.Geolocation.addEventListener('location', locationCallback);

	
	/*　住所から緯度経度
	Ti.Geolocation.forwardGeocoder('440 Bernardo Ave Mountain View CA', function(e) {
   			latitude = e.latitude;
        	longitude = e.longitude;
	});
	*/
	/* 緯度経度から住所（undefinedになるから間違ってるのかも）
	Ti.Geolocation.reverseGeocoder(mapview.region.latitude, mapview.region.longitude, function(e) {
   		tfPresent.setValue('' + e.places.address);
	});
	*/
	
	/* 終了処理書かないと
	win.addEventLisner("close", function() {
		Titanium.UI.removeEventLisner("location", getCurrentLocation);
	});*/

	return win;
}

module.exports = Window2;