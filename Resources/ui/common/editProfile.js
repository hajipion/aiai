function editProfView(_args) {
	var win = Titanium.UI.createWindow({
		title:_args.title
	});
	
	// get tab group object
	var tabGroup = _args.tabGroup;


	return win;
};

module.exports = editProfView;