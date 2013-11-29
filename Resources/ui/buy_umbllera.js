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
	
	var appid =  'dj0zaiZpPWNNNDZuandRTDB0QiZzPWNvbnN1bWVyc2VjcmV0Jng9MjU-';	
	var url = "http://shopping.yahooapis.jp/ShoppingWebService/V1/json/itemSearch";
	
	//urlにパラメータを付加してゲットすればJSONP形式で帰ってきそう
	
 	var client = Ti.Network.createHTTPClient({
		// function called when the response data is available
     	onload : function(e) {
        	Ti.API.info("Received text: " + this.responseText);
         	alert('success');
     	},
     	// function called when an error occurs, including a timeout
     	onerror : function(e) {
         	Ti.API.debug(e.error);
         	alert('error');
     	},
     	timeout : 5000  // in milliseconds
 	});
 	// Prepare the connection.
 	client.open("GET", url);
 	// Send the request.
 	client.send();
	return win;
}

module.exports = buyView;