function buyView(title){
	
	var win = Ti.UI.createWindow({
		backgroundColor: '#fff',
		title: title
	});

	// base view 
	var view = Ti.UI.createView({
		layout: 'vertical',
		backgroundImage: '/images/bg_sample.png'
	});

	win.add(view);
	var table = Ti.UI.createTableView();
	view.add(table);
	
	var appid =  'appid=dj0zaiZpPWNNNDZuandRTDB0QiZzPWNvbnN1bWVyc2VjcmV0Jng9MjU-';	
	var url = "http://shopping.yahooapis.jp/ShoppingWebService/V1/itemSearch?";
	
	function showItems(items) {
		var data = [];
    	for(var i=0;i<items.length;i++){
        	var row = Ti.UI.createTableViewRow();
        	row.title = items.item(i).getElementsByTagName("Name").item(0).text;
        	row.leftImage = item.item(i).getElementsByTagName("Small").item(0).text;
        	data.push(row); 
    	}
    	table.setData(data);
	}
	
    var xhr = Ti.Network.createHTTPClient({
    	onload : function(e) {
        	var doc = this.responseXML.documentElement;
        	var items = doc.getElementsByTagName("Hit");
        	showItems(items);
     	},
     	onerror : function(e) {
         	alert('error');
     	},
     	timeout : 5000  // in milliseconds
    });
    xhr.open("GET",url+appid+'&query=傘');
    xhr.send();
	
	return win;
}

module.exports = buyView;