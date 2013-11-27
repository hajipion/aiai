function TileView(title){
	
	var win = Ti.UI.createWindow({
		title: title
	});
	
	// base view 
	var view = Ti.UI.createView({
		backgroundColor: '#fff',
		height: 'auto',
		width: 'auto',
		fill: false,
		top: 0
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
	var perRow = 3;
	var cellWidth = Ti.Platform.displayCaps.platformWidth / perRow;
	var cellHeight = cellWidth;
	
	var row;
	
	for(var i = 0; i < 18; i++){
  		if(i === 0 || i % perRow === 0){
    	if(i > 0){
      		data.push(row);
    	}
    	row = Ti.UI.createTableViewRow({height: cellHeight});
    	var rowView = Ti.UI.createView({
      		layout: 'horizontal',
      		width: Ti.UI.FILL,
      		height: cellHeight
    	});
    	row.add(rowView);
  	}
  	var usr_view_frame = Ti.UI.createView({
  		//borderColor: 'blue',
  		//borderWidth: 3,
    	width: cellWidth,
    	height: cellHeight
  	});
  	
  	var usr_view = Ti.UI.createView({
  		borderColor: 'black',
  		borderWidth: 3,
  		borderRadius: 5,
  		//backgroundColor: '#2CD6B5',
  		height: '90%',
  		width: '90%'
  	});
  	usr_view_frame.add(usr_view);
  	rowView.add(usr_view_frame);
	}
	data.push(row);

	var table = Ti.UI.createTableView({
		separatorStyle: 0,
		separatorColor: '#fff',
  		data: data,
  		width: Ti.UI.FILL
	});
 
	view.add(table);
	/*
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
	*/
	
	win.add(view);

	return win;
}

module.exports = TileView;