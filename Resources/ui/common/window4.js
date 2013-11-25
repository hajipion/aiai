function Window4(title){
	
	var win = Ti.UI.createWindow({
		backgroundImage: '/images/bg_sample.png',
		title: title
	});
	
	var preferences = [
		{title:'基本プロフィール', hasSwitch: false, test: 'ui/common/editProfile'},
		{title:'履歴', hasSwitch: false},
		{title:'facebookの友人にしかヘルプを求めない', hasSwitch: true},
		{title:'チュートリアルとヘルプ', hasSwitch: false},
		{title:'利用規約', hasSwitch: false},
		{title:'ログアウト', hasSwitch: false}
	];
	
	//画像取得用api
	var Cloud = require('ti.cloud');
    Cloud.debug = true;
	
	Cloud.Users.showMe(function (e) {
	    if (e.success) {
	        var user = e.users[0];
	        var anImageView = Ti.UI.createImageView({
	        	//image : user.photo.urls.thumb_100,
	            width : 100,
	            height : 100,
	            top :  100  * Math.ceil(i / 4),
	            left : 100 * (i % 4)
	        });
	        //適当に表示
	        win.add(anImageView);
	    } else {
	        alert('Error:\n' + ((e.error && e.message) || JSON.stringify(e)));
	    }
	});

	var data = [];
	var isAndroid = Titanium.Platform.name == 'android';

	for (var i=0;i<preferences.length;i++) {
    	var pref = preferences[i];
    	var row = Ti.UI.createTableViewRow({
    		title: pref.title,
    		height: 70
    	});
    	if(pref.hasSwitch === true){
    		if (isAndroid) {
    			row.hasCheck = true;
			} else {
	    		var s1 = Titanium.UI.createSwitch({
        			value: false,
        			right: 5
				});
				row.add(s1);
				s1.addEventListener('change', function(e) {
    				// e.valueにはスイッチの新しい値が true もしくは falseとして設定されます。
    				Titanium.App.Properties.setBool('Bool',e.value);
			}
    	}
    	data.push(row);
	}	
	
	var table = Titanium.UI.createTableView({
		data: data
	});

	win.add(table);

	var pref = require('ui/common/Preferences');
	// 行クリック時の処理
	table.addEventListener('click', function(e){
		var index = e.index;
		switch(index){
			case 2:
				if(isAndroid){
					if(e.row.getHasCheck()){
						e.row.setHasCheck(false);
					} else {
						e.row.setHasCheck(true);
					}
				} else {
					
				}
				break;
			default:
				win.add(pref.showPrefView(index));
				break;
		}
	});

	return win;
}

module.exports = Window4;