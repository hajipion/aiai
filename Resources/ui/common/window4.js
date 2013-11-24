function Window4(title){
	
	var win = Ti.UI.createWindow({
		backgroundImage: '/images/bg_sample.png',
		title: title
	});
	
	var preferences = [
		{title:'基本プロフィール', hasSwitch: false},
		{title:'履歴', hasSwitch: false},
		{title:'facebookの友人にしかヘルプを求めない', hasSwitch: true},
		{title:'チュートリアルとヘルプ', hasSwitch: false},
		{title:'利用規約', hasSwitch: false},
		{title:'ログアウト', hasSwitch: false}
	];

	var data = [];

	for (var i=0;i<preferences.length;i++) {
    	var pref = preferences[i];
    	/*
    	var itemLabel = Ti.UI.createLabel({
    		//left: 0,
    		width: '70%'
    	}); 
    	itemLabel.text = pref.title;
    	row.add(itemLabel);
    	*/
    	if(pref.hasSwitch === true){
    		if (Titanium.Platform.name == 'android') {
    			var row = Ti.UI.createTableViewRow({
    				title: pref.title,
    				hasCheck: true,
		    		height: 70
    			});
			} else {
				var row = Ti.UI.createTableViewRow({
    				title: pref.title,
    				//layout: 'horizontal',
    				height: 70
    			});
	    		var s1 = Titanium.UI.createSwitch({
    				//width: '30%',
        			value: false,
        			//titleOff: '',
        			//titleOn: '',
        			right: 5
				});
				row.add(s1);
				// create a switch change listener
				s1.addEventListener('change', function(e) {
    				// e.valueにはスイッチの新しい値が true もしくは falseとして設定されます。
    				Titanium.App.Properties.setBool('Bool',e.balue);
				});
			}
    	} else {
    		var row = Ti.UI.createTableViewRow({
    			title: pref.title,
    			//layout: 'horizontal',
    			height: 70
    		});
    	}
    	
    	data.push(row);
	}	
	
	var table = Titanium.UI.createTableView({
		data: data
	});

	win.add(table);

	// 行クリック時の処理
	table.addEventListener('click', function(e){
		var index = e.index;
		switch(index){
			case 2:
				if(e.row.getHasCheck()){
					e.row.setHasCheck(false);
				} else {
					e.row.setHasCheck(true);
				}
				break;
			default:
				break;
		}
	});

	return win;
}

module.exports = Window4;