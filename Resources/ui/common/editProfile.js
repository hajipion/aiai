function editProfView(_args) {
	var win = Titanium.UI.createWindow({
		title:_args.title
	});
	
	// get tab group object
	var tabGroup = _args.tabGroup;

	var view = Ti.UI.createView({
		backgroundColor: "#fff",
	});

    //プロフィール画像表示
    view.add(anImageView);
	win.add(view);
	return win;
};

module.exports = editProfView;