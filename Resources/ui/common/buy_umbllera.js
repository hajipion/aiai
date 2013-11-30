function buyView(title, parent){
	
	var win = Ti.UI.createWindow({
		backgroundColor: '#fff',
		title: title
	});

	var table = Ti.UI.createTableView();
	win.add(table);
	
	var appid =  'appid=dj0zaiZpPWNNNDZuandRTDB0QiZzPWNvbnN1bWVyc2VjcmV0Jng9MjU-';	
	var url = "http://shopping.yahooapis.jp/ShoppingWebService/V1/itemSearch?";
	
	function showItems(items) {
		var data = [];
    	for(var i=0;i<items.length;i++){
        	var row = Ti.UI.createTableViewRow({
        		height: 150,
        		layout: 'horizontal'
        	});

    		var image = Ti.UI.createImageView({
    			image: items.item(i).getElementsByTagName("Medium").item(0).text,
    			height: '90%',
				left: 10
    		});
    		var titleLabel = Ti.UI.createLabel({
    			height: '100%',
	    		width: '60%',
    			font: { fontSize:20 },
	    		color: '#666',
	    		fontWeight: 'bold',
	    		left: 10,
	    		text: items.item(i).getElementsByTagName("Name").item(0).text
    		});

	    	row.add(image);
    		row.add(titleLabel);
        	data.push(row); 
    	}
    	table.setData(data);
	}
	
	table.addEventListener('click', function(e){
		var itemUrl = items.item(e.index).getElementsByTagName("Url").item(0).text;
		var itemView = Ti.UI.createWebView({url:itemUrl});
		var itemWin = Ti.UI.createWindow();
		itemWin.add(itemView);
		parent.containingTab.open(itemWin,{modal:true});
	});
	
	var items;
    var xhr = Ti.Network.createHTTPClient({
    	onload : function(e) {
        	var doc = this.responseXML.documentElement;
        	items = doc.getElementsByTagName("Hit");
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