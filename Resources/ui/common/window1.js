function Window1(title){
	
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
		//backgroundColor: '#dcdcdc',
		opacity: 0,
		height: '90%',
		width: '80%',
		fill: false
	});

	var icon_image = Ti.UI.createImageView({
		image: '/images/icon_umbrella.png',
		width: 130,
		top:10
	});

	// bottom view
	var view_bottom = Ti.UI.createView({
		height: '80%',
		width: 'auto',
	  	fill: false,
		bottom: 0
	});
	
	var view_bottom_back = Ti.UI.createView({
	 	backgroundColor: '#dcdcdc',
	 	opacity: 0.7,
	 	top:60,
	 	width: '80%',
		height: '70%'
	});

	var view_prof = Ti.UI.createView({
		width: '100%',
		fill: false,
		top: 0
	});

	var prof_kind = [ 
						{text:'相合仲間 ', num: '24人'},
						{text:'助けた回数 ', num: '2回'},
						{text:'助けてもらった回数 ', num: '2回'},
						{text:'紳士度 ', num: '10%'}
					];

	var nameLabel = Ti.UI.createLabel({
		text: '山田 太郎',
		top: 20,
    	font: { fontSize:23 },
	    color: '#000',
	    fontWeight: 'bold'
	});
	view_prof.add(nameLabel);
	var view_profLabel = Ti.UI.createView({
		height: '75%',
		top: 65,
		bottom: 0,
		layout: 'vertical'
	});

	for(var i=0;i<prof_kind.length;i++){
		var profLabel = Ti.UI.createLabel({
			left: 20,
			width: '65%',
			color: '#666'
		});
		var numLabel = Ti.UI.createLabel({
			left: 15,
			width: '20%',
			color: '#38695A',
			font: {fontSize: 20}
		});
		var view_profList = Ti.UI.createView({
			width: '100%',
			height: '21%',
			bottom: 0,
			layout: 'horizontal'
		});
		profLabel.text = prof_kind[i].text;
		numLabel.text = prof_kind[i].num;
		view_profList.add(profLabel);
		view_profList.add(numLabel);
		view_profLabel.add(view_profList);
	}
	view_prof.add(view_profLabel);
	view_top.add(view_top_back);
	view_top.add(icon_image);
	view_bottom_back.add(view_prof);
	view_bottom.add(view_bottom_back);

	view.add(view_top);
	view.add(view_bottom);

	win.add(view);

	return win;
}

module.exports = Window1;