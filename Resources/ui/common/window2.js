function Window2(title){
	
	var win = Ti.UI.createWindow({
		title: title
	});	
	
	// base view
	var view = Ti.UI.createView({
		// layout: 'vertical'
	});
	
	if(!Titanium.Geolocation.locationServicesEnabled){
        var alt = Titanium.UI.createAlertDialog({
            title:'位置情報取得',
            message:'位置測定が出来ません。電波状況、設定を確認してください。'
        });
        alt.show();
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
		opacity: 0.7
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
		hintText: "目的地を入力",
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
		//title: "HELP?",
		//message: "近くの人に助けを求めますか？",
		buttonNames: ["OK","Cancel"],
		cancel: 1
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
	
	// 最初に中心となる位置をセットしておく
	var mapview = Ti.Map.createView({
 		mapType: Ti.Map.STANDARD_TYPE,
 		region: {latitude:35.681382, longitude:139.76608, latitudeDelta:0.01, longitudeDelta:0.01},
 		animate: true,
 		regionFit: true,
 		width: 'auto',
 		height: 'auto'
	});

	view.add(mapview);
	win.add(view);
	
	Ti.Geolocation.purpose = 'Get Current Location';
    Ti.Geolocation.accuracy = Ti.Geolocation.ACCURACY_BEST;
    //Ti.Geolocation.distanceFilter = 10;
    Ti.Geolocation.preferredProvider = Ti.Geolocation.PROVIDER_GPS;
	// location継続的に取得
    Ti.Geolocation.addEventListener('location', function(e) {
        if (e.error) {
            alert('Error: ' + e.error);
        } else {
            // 現在地をセット
  			latitude = e.coords.latitude;
        	longitude = e.coords.longitude;
        	
        	// テキストフィールドに現在地を書く
        	tfPresent.setValue(''+latitude);
        	tfDestination.setValue(''+longitude);
        }
    });
	
	/* 
	if(Titanium.Platform.name == 'android'){
	// demonstrates manual mode:
	var providerGps = Ti.Geolocation.Android.createLocationProvider({
    	name: Ti.Geolocation.PROVIDER_GPS,
    	minUpdateDistance: 0.0,
    	minUpdateTime: 0
	});
	Ti.Geolocation.Android.addLocationProvider(providerGps);
	Ti.Geolocation.Android.manualMode = true;
	var locationCallback = function(e) {
    	if (!e.success || e.error) {
    		tfPresent.setValue('error:' + JSON.stringify(e.error));
    	} else {
    		tfPresent.setValue('coords: ' + JSON.stringify(e.coords));
		}
	};
	Titanium.Geolocation.addEventListener('location', locationCallback);
	} else {
	Titanium.Geolocation.getCurrentPosition(
 		function(e) {
  			if(!e.success || e.error){
   				//alert('位置情報が取得できませんでした');
   				alert.show();
   				return;
  			}
  			// 現在地をセット
  			latitude = e.coords.latitude;
        	longitude = e.coords.longitude;
        	
        	// 小数点第二位に省略
        	var shortLatitude = Math.round(latitude * 100) / 100;
        	var shortLongitude = Math.round(longitude * 100) / 100;
        	
        	// テキストフィールドに現在地を書く
        	tfPresent.setValue('現在地：'+shortLatitude+','+shortLongitude);
  
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
            	animate:true,
            	latitudeDelta:0.01,
            	longitudeDelta:0.01
        	});
 		}
	);
	}*/
	// view.add(map);
	
	/*　住所から緯度経度
	Ti.Geolocation.forwardGeocoder('440 Bernardo Ave Mountain View CA', function(e) {
   			latitude = e.latitude;
        	longitude = e.longitude;
        	
        	var shortLatitude = Math.round(latitude * 100) / 100;
        	var shortLongitude = Math.round(longitude * 100) / 100;
        	
        	// テキストフィールドに現在地を書く
        	tfPresent.setValue('現在地：'+shortLatitude+','+shortLongitude);
        	
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
            	animate:true,
            	latitudeDelta:0.01,
            	longitudeDelta:0.01
        	});
	});*/
	
	/* 緯度経度から住所（undefinedになるから間違ってるのかも）
	Ti.Geolocation.reverseGeocoder(mapview.region.latitude, mapview.region.longitude, function(e) {
   		tfPresent.setValue('' + e.places.address);
	});
	*/
	view.add(view_search);
	view_search.add(tfPresent);
	view_search.add(tfDestination);
	view_search.add(sbmbutton);
	
	win.add(view);

	return win;
}

module.exports = Window2;