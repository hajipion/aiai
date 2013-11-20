function ProfileWindow(title){
	
	var win = Ti.UI.createWindow({
		backgroundColor: '#fff',
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

	var view_prof = Ti.UI.createView({
		height: '60%',
		width: '80%',
		fill: false,
		top: 0
		// このなかに、リストビューを埋め込む
		// それぞれのユーザ情報を取得して表示
	});

	var prof_kind = [ 
						{text:'相合仲間', num: '24人'},
						{text:'助けた回数', num: '2回'},
						{text:'助けてもらった回数', num: '2回'},
						{text:'紳士度', num: '10%'}
					];
	
	var nameLabel = Ti.UI.createLabel({
		text: '山田 太郎',
		height: '25%',
		top: 0
	});
	view_prof.add(nameLabel);
	var view_profLabel = Ti.UI.createView({
		height: '75%',
		bottom: 0,
		layout: 'vertical'
	});
	
	for(var i=0;i<prof_kind.length;i++){
		var label = Ti.UI.createLabel({
			top: 0,
			height: '25%'
		});
		label.text = prof_kind[i].text;
		view_profLabel.add(label);
	}
	/*
	view_profLabel.add(Ti.UI.createLabel({
		text: '相合仲間'
	}));
	view_profLabel.add(Ti.UI.createLabel({
		text: '相合仲間'
	}));*/
	view_prof.add(view_profLabel);
	view_prof.add(view_bottom_back);
	view_top.add(view_top_back);
	view_top.add(icon_image);
	view_bottom.add(view_prof);

	view.add(view_top);
	view.add(view_bottom);

	win.add(view);

	return win;
}

module.exports = ProfileWindow;