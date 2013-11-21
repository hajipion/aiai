function ApplicationTabGroup(Window) {
	//create module instance
	var self = Ti.UI.createTabGroup({
		tabsBackgroundColor : "#2CD6B5",
		barColor: '#2CD6B5',
		tabsTintColor: "#2B6C5B"
	});
	
	var nextWindow = Titanium.UI.createWindow(
	    {
			url: 'next.js',
			barColor: '#000'
	    }
	);
	
	var view1 = Ti.UI.createView({
		width: 150,
		height: 150,
		top:180
	});
	//var view2 = Ti.UI.createView();
	var view4 = Ti.UI.createView();

	var Win3 = require('ui/common/window3');
	var Win2 = require('ui/common/window2');
	//create app tabs
	var win1 = new Window('ホーム'),
		win2 = new Win2('ヘルプ'),
		win3 = new Win3('相合仲間'),
		win4 = new Window('設定');
	
	var tab1 = Ti.UI.createTab({
		title: 'ホーム',
		icon: '/images/KS_nav_home.png',
		window: win1
	});
	var tab2 = Ti.UI.createTab({
		title: 'ヘルプ',
		icon: '/images/KS_nav_help.png',
		window: win2
	});
	var tab3 = Ti.UI.createTab({
		title: '相合仲間',
		icon: '/images/KS_nav_friends.png',
		window: win3
	});
	var tab4 = Ti.UI.createTab({
		title: '設定',
		icon: '/images/KS_nav_setting.png',
		window: win4
	});
	
	win1.containingTab = tab1;
	win2.containingTab = tab2;
	win3.containingTab = tab3;
	win4.containingTab = tab4;
	
	win1.add(view1);
	// win2.add(view2);
	win4.add(view4);
	
	// ラベルを作る
	var label = Ti.UI.createLabel({
		text: "Hello World" ,
		height: 12,
		width: 150,
		top: 120,
		color: "red"
	});
	// ボタンをつくる
	var button = Ti.UI.createButton({
		title: "push me!",
		top: 100,
		width: 100,
		height: 32
	});
	var alert = Ti.UI.createAlertDialog({
		title: "delete?",
		message: "Are you sure?",
		buttonNames: ["OK","Cancel","Help"],
		cancel: 1
	});
	alert.addEventListener("click", function(e){
		Ti.API.info(e.index);
	});
	button.addEventListener("click",function(e){
		alert.show();
	});
	
	view1.add(label);
	view1.add(button);
	
	//view2.add(tf);
	//view2.add(sbmbutton);
	//view2.add(map);
	
	self.addTab(tab1);
	self.addTab(tab2);
	self.addTab(tab3);
	self.addTab(tab4);
	
	return self;
};

module.exports = ApplicationTabGroup;
