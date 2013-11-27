function Window1(title){
	
	var win = Ti.UI.createWindow({
		backgroundColor: '#fff',
		title: title
	});

	// base view 
	var view = Ti.UI.createView({
		layout: 'vertical',
		backgroundImage: '/images/bg_sample.png'
	});

	// top view
	var view_top = Ti.UI.createView({
		height: '25%',
		width: 'auto',
		fill: false,
		top: 0
	});

	var icon_image = Ti.UI.createImageView({
		image: '/images/icon_umbrella.png',
		width: 130,
		//top:10
	});

	// bottom view
	var view_bottom = Ti.UI.createView({
		height: '60%',
		width: 'auto',
	  	fill: false,
	  	top: 0,
	});
	
	var view_bottom_back = Ti.UI.createView({
	 	backgroundColor: '#dcdcdc',
	 	opacity: 0.7,
	 	width: '80%',
		height: '90%'
	});

	var view_prof = Ti.UI.createView({
		layout: 'vertical',
		width: '80%',
		fill: false,
		height: '90%'
	});

	var prof_kind = [ 
						{text:'相合仲間 ', num: '24人'},
						{text:'助けた回数 ', num: '2回'},
						{text:'助けてもらった回数 ', num: '2回'},
						{text:'紳士ポイント ', num: '10pt'}
					];

	var nameLabel = Ti.UI.createLabel({
		height: '20%',
		text:  Ti.App._username,
    	font: { fontSize:23 },
	    color: '#000',
	    fontWeight: 'bold'
	});
	view_prof.add(nameLabel);
	var view_profLabel = Ti.UI.createView({
		height: '95%',
		layout: 'vertical'
	});

	for(var i=0;i<prof_kind.length;i++){
		var profLabel = Ti.UI.createLabel({
			left: 0,
			width: '75%',
			color: '#666'
		});
		var numLabel = Ti.UI.createLabel({
			right: 0,
			width: '20%',
			color: '#38695A',
			//font: {fontSize: 20}
		});
		var view_profList = Ti.UI.createView({
			width: '100%',
			height: '25%',
			bottom: 0,
			//layout: 'horizontal'
		});
		profLabel.text = prof_kind[i].text;
		numLabel.text = prof_kind[i].num;
		view_profList.add(profLabel);
		view_profList.add(numLabel);
		view_profLabel.add(view_profList);
	}
	view_prof.add(view_profLabel);
	view_top.add(icon_image);
	view_bottom_back.add(view_prof);
	view_bottom.add(view_bottom_back);
	
	var buyBtn = Ti.UI.createButton({
		height: '10%',
		width: '80%',
		title: '傘を買う',
		color: '#fff',
		backgroundImage: '/images/back-login-button.png'
	});
	buyBtn.addEventListener("click",function(e){
		var webview = Titanium.UI.createWebView({url:'http://shopping.yahoo.co.jp/'});
    	var window = Titanium.UI.createWindow();
    	window.add(webview);
    	win.containingTab.open(window,{modal:true});
	});
	view.add(view_top);
	view.add(view_bottom);
	view.add(buyBtn);

	win.add(view);

	return win;
}

module.exports = Window1;