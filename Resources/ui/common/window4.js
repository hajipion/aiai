function Window4(title){
	
	var win = Ti.UI.createWindow({
		title: title
	});
	
	var rows = [
		{title:'基本プロフィール',  hasChild:true, url:'http://www.apple.co.jp'},
		{title:'履歴', hasChild:true, url:'http://www.amazon.co.jp'},
		{title:'友人にしかヘルプを求めない', hasChild:true, url:'http://www.google.co.jp'},
		{title:'チュートリアルとヘルプ', hasChild:true, url:'http://www.google.co.jp'},
		{title:'利用規約', hasChild:true, url:'http://www.google.co.jp'},
		{title:'ログアウト', hasChild:true, url:'http://www.google.co.jp'}
	];

	var tblView = Titanium.UI.createTableView({
		data:rows
	});

	win.add(tblView);

	// 行クリック時の処理
	tblView.addEventListener('click', function(e){

	});

	return win;
}

module.exports = Window4;