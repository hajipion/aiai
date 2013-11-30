function Window4(title){

	var self = Ti.UI.createWindow({
		backgroundImage: '/images/bg_sample.png',
		title: title
	});

	var preferences = [
		{title:'基本プロフィール', hasSwitch: false, test: 'ui/common/editProfile'},
		{title:'履歴', hasSwitch: false},
		{title:'facebookの友人に限定', hasSwitch: true},
		{title:'チュートリアルとヘルプ', hasSwitch: false},
		{title:'利用規約', hasSwitch: false},
		{title:'ログアウト', hasSwitch: false}
	];

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
				});
			}
		}
    	data.push(row);
	}

	var table = Titanium.UI.createTableView({
		data: data
	});

	self.add(table);

	// 行クリック時の処理
	table.addEventListener('click', function(e){
		var index = e.index;
		switch(index){
			case 0:
				var pref = require('ui/common/editProfile'),
					win = new pref({title:e.rowData.title,containingTab:self.containingTab,tabGroup:self.tabGroup});
					self.containingTab.open(win,{animated:true});
				break;
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
				break;
		}
	});

	return self;
}

module.exports = Window4;