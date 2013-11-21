function Window3(title){
	
	var win = Ti.UI.createWindow({
		title: title
	});
	
	// base view 
	var view = Ti.UI.createView({
		backgroundImage: '/images/bg_sample.png'
	});

	// top view
	var view_top = Ti.UI.createView({
		height: '35%',
		width: 'auto',
		fill: false,
		top: 0
	});

	var view_top_back = Ti.UI.createView({
		//backgroundColor: '#dcdcdc',
		opacity: 0,
		height: '90%',
		width: '80%',
		fill: false
	});
	
	var icon_image = Ti.UI.createImageView({
		image: '/images/icon_umbrella.png',
		width: 110
	});

	// bottom view
	var view_bottom = Ti.UI.createView({
		height: '65%',
		width: 'auto',
	  	fill: false,
		bottom: 0
	});
	
	var view_bottom_back = Ti.UI.createView({
	 	backgroundColor: '#dcdcdc',
	 	opacity: 0.5
	});

	var view_list = Ti.UI.createView({
		height: '90%',
		width: '80%',
		fill: false,
		// このなかに、リストビューを埋め込む
		// それぞれのユーザ情報を取得して表示
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
    		height: 50
    	});
    	var nameLabel = Ti.UI.createLabel({
    		font: { fontSize:20 },
    		color: '#000',
    		top: 5
    	});
    	var heartLabel = Ti.UI.createLabel({
			layout: 'horizontal',
    		font: { fontSize:14 },
	    	color: '#38695A',
	    	fontWeight: 'bold'
    	});
    	var perLabel = Ti.UI.createLabel({
			layout: 'horizontal',
    		font: { fontSize:17 },
	    	color: '#38695A',
	    	fontWeight: 'bold',
    		bottom: 3
    	});
    	nameLabel.text = user.text;
    	heartLabel.text = '♥紳士度 ';
    	perLabel.text = heartLabel.text + user.per;
    	row.add(nameLabel);
    	row.add(perLabel);
    	data.push(row);
	}	
	
	var user_list = Ti.UI.createTableView({
		opacity: 0.5,
		data: data
	});
	
	user_list.addEventListener('click', function(e){
		var Prof = require('ui/common/profile');
		var prof = new Prof(win);
		// Ti.UI.currentTab.open(prof,{animated:true});
		// prof.open();
		//win.containingTab.open(
			//prof,{anmated:true}
		//);
		win.add(prof);
	});
	view_list.add(view_bottom_back);
	view_list.add(user_list);

	view_top.add(view_top_back);
	view_top.add(icon_image);
	view_bottom.add(view_list);

	view.add(view_top);
	view.add(view_bottom);

	win.add(view);

	return win;
}

module.exports = Window3;