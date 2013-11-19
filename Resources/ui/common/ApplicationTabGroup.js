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
	var view2 = Ti.UI.createView();
	// var view3 = Ti.UI.createView();
	var view4 = Ti.UI.createView();

	//create app tabs
	var win1 = new Window(L('ホーム')),
		win2 = new Window(L('ヘルプ')),
		win3 = new Window(L('相合仲間')),
		win4 = new Window(L('設定'));
	
	var tab1 = Ti.UI.createTab({
		title: L('ホーム'),
		icon: '/images/KS_nav_home.png',
		window: win1
	});
	var tab2 = Ti.UI.createTab({
		title: L('ヘルプ'),
		icon: '/images/KS_nav_help.png',
		window: win2
	});
	var tab3 = Ti.UI.createTab({
		title: L('相合仲間'),
		icon: '/images/KS_nav_friends.png',
		window: win3
	});
	var tab4 = Ti.UI.createTab({
		title: L('設定'),
		icon: '/images/KS_nav_setting.png',
		window: win4
	});
	
	win1.containingTab = tab1;
	win2.containingTab = tab2;
	win3.containingTab = tab3;
	win4.containingTab = tab4;
	
	win1.add(view1);
	win2.add(view2);
	//win3.add(view3);
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
	
	//　マップためしてみた
	var ebisu = Ti.Map.createAnnotation({
		latitude: 35.645,
		longitude: 139.71,
		title: "Ebisu",
		animate: true
	});
	var map = Ti.Map.createView({
		mapType: Ti.Map.STANDARD_TYPE,
		region: {latitude: 35.645, longitutde: 139.71, latitudeDelta:0.01, longitudeDelta:0.01},
		animate: true,
		regionFit: true,
		width: 300,
		height:100
	});
	var tf = Ti.UI.createTextField({
		color: "#333",
		hintText: "name",
		height: 35,
		top: 310,
		left: 10,
		width: 250,
		borderStyle: Ti.UI.INPUT_BORDERSTYLE_ROUNDED
	});
	var sbmbutton = Ti.UI.createButton({
		title: "Submit!",
		top:100,
		left: 10,
		width:100,
		height: 40
	});
	sbmbutton.addEventListener("click",function(e){
		Ti.API.info(tf.getValue());
	});
	
	// ここからview3
	var view3 = Ti.UI.createView({
		backgroundImage: '/images/bg_sample.png'
	});

	// top view
	var view3_top = Ti.UI.createView({
		height: '35%',
		width: 'auto',
		fill: false,
		top: 0
	});

	var view3_icon = Ti.UI.createView({
		backgroundColor: '#dcdcdc',
		opacity: 0.5,
		height: '90%',
		width: '80%',
		fill: false,
	});

	var icon_image = Ti.UI.createImageView({
		image: '/images/icon_umbrella.png'
	});

	// bottom view
	var view3_bottom = Ti.UI.createView({
		height: '65%',
		width: 'auto',
		fill: false,
		bottom: 0
	});

	var view3_list = Ti.UI.createView({
		height: '90%',
		width: '80%',
		fill: false,
		// このなかに、リストビューを埋め込む
		// それぞれのユーザ情報を取得して表示
	});

	var view3_list_back = Ti.UI.createView({
		backgroundColor: '#dcdcdc',
		opacity: 0.5
	});

	var users = [
					{text:'user1', per: '50%'},
					{text:'user2', per: '20%'},
					{text:'user3', per: '70%'},
					{text:'user4', per: '50%'},
					{text:'user5', per: '20%'},
					{text:'user6', per: '60%'},
					{text:'user7', per: '10%'}
				];//仮のデータです
	var data = [];

	for (var i=0;i<users.length;i++) {
    	var user = users[i];
    	var row = Ti.UI.createTableViewRow({
    		height: 80
    	});
    	var nameLabel = Ti.UI.createLabel({
    		font: { fontSize:30 },
    		color: '#000',
    		backgroundColor: 'blue',
    		height: '50%',
    		top: 0
    	});
    	var perLabel = Ti.UI.createLabel({
    		font: { fontSize:25 },
    		color: '#000',
    		backgroundColor: 'red',
    		height: '50%',
    		bottom: 0
    	});
    	nameLabel.text = user.text;
    	perLabel.text = user.per;
    	row.add(nameLabel);
    	row.add(perLabel);
    	data.push(row);
	}
	var user_list = Ti.UI.createTableView({
		data: data
	});

	view3_list.add(view3_list_back);
	view3_list.add(user_list);

	view3_top.add(view3_icon);
	view3_top.add(icon_image);
	view3_bottom.add(view3_list);

	view3.add(view3_top);
	view3.add(view3_bottom);
	win3.add(view3);
	// ここまでview3
	
	view1.add(label);
	view1.add(button);
	
	view2.add(tf);
	view2.add(sbmbutton);
	view2.add(map);
	

	
	self.addTab(tab1);
	self.addTab(tab2);
	self.addTab(tab3);
	self.addTab(tab4);
	
	return self;
};

module.exports = ApplicationTabGroup;
