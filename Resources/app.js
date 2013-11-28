/*
 * A tabbed application, consisting of multiple stacks of windows associated with tabs in a tab group.  
 * A starting point for tab-based application with multiple top-level windows. 
 * Requires Titanium Mobile SDK 1.8.0+.
 * 
 * In app.js, we generally take care of a few things:
 * - Bootstrap the application with any data we need
 * - Check for dependencies like device type, platform version or network connection
 * - Require and open our top-level UI component
 *  
 */

//bootstrap and check dependencies
if (Ti.version < 1.8 ) {
	alert('Sorry - this application template requires Titanium Mobile SDK 1.8 or later');
}

// This is a single context application with mutliple windows in a stack
(function() {
	
	//determine platform and form factor and render approproate components
	var osname = Ti.Platform.osname,
		version = Ti.Platform.version,
		height = Ti.Platform.displayCaps.platformHeight,
		width = Ti.Platform.displayCaps.platformWidth;
	
	//considering tablet to have one dimension over 900px - this is imperfect, so you should feel free to decide
	//yourself what you consider a tablet form factor for android
	var isTablet = osname === 'ipad' || (osname === 'android' && (width > 899 || height > 899));
	
	var Window;
	if (isTablet) {
		Window = require('ui/tablet/ApplicationWindow');
	}
	else {
		Window = require('ui/handheld/ApplicationWindow');
	}

 
var deviceToken;
var Cloud = require('ti.cloud');
Cloud.debug = true;
//var CloudPush = require('ti.cloudpush'); 
 
 
 //Androidようにデバイストークン取得れ，iphoneだとエラーなので，一応コメントあうと
/*CloudPush.retrieveDeviceToken({
          success: function deviceTokenSuccess(e) {
              alert('Device Token: ' + e.deviceToken);
              deviceToken = e.deviceToken
              login_user();
          },
          error: function deviceTokenError(e) {
              alert('Failed to register for push! ' + e.error);
       }
  });*/
 
 //エミュレータで新規作成したいときはvar nameをnuullに
var name = Ti.App.Properties.getString('username');
// var name = null;
var pass = Ti.App.Properties.getString('pass');

	if (name) {
            //alert(name);
			login_user();
			var ApplicationTabGroup =require('ui/common/ApplicationTabGroup');		
                 
        }else{
        	var ApplicationTabGroup = require('ui/common/login');
        	new ApplicationTabGroup(Window).open();
        }


 
　　
  function login_user(){
	var Cloud = require('ti.cloud');
    Cloud.debug = true;
  
    //友達変数
 	Ti.App._withFriends =[];
    // ユーザー作成API呼び出し（一回ログインしたら再度ログインしなくていいようにしないとね）
    //button.title = 'ログイン';
    //button.addEventListener('click', function(e) {
   	var ApplicationTabGroup =require('ui/common/ApplicationTabGroup');
	//username = userNameText.value;
     
       
       // pass = passText.value;
        
    var loginname = Ti.App.Properties.getString('username');
     //usernameを保存
   	Ti.App._username = loginname;
    var loginpass = Ti.App.Properties.getString('pass');
	Ti.App.Properties.setString('username',  name);
        Cloud.Users.login({
        login:    loginname,
        password: loginpass
   			 }, function (e) {
        if (e.success) {
 			    Cloud.PushNotifications.subscribe({
    channel: 'friend_request', // "alert" is channel name
    device_token: deviceToken,
    type: 'android'
}, function (e){
    if (e.success) {
       alert('Subscribed for Push Notification!');
    }else{
        alert('Error:' +((e.error && e.message) || JSON.stringify(e)));
    }
});
            var user = e.users[0];
            //user_idを保存
            Ti.App._userid =user.id;
            alert('Success:\\n' +
                'id: ' + user.id + '\\n' +
                'first name: ' + user.first_name + '\\n' +
                'last name: ' + user.last_name);
   		//ともだち取得(ちょっと保留)
   		Cloud.debug = true;
		Cloud.Friends.search({
		user_id: Ti.App._userid
		}, function (e) {
    	if (e.success&&e.users.length>0) {

        for (var i = 0; i < e.users.length; i++) {
          		var user = e.users[i];

		  		var currentWithFriends = Ti.App._withFriends;
	     		 var ids = {
   					text:user.username,
   					pt:'50pt',
				};
			currentWithFriends.push(ids);
	      	Ti.App._withFriends=currentWithFriends;
		  //友達情報を読み込んでからページをopen！！
		  	new ApplicationTabGroup(Window).open();
        	 }
     }else{
     		new ApplicationTabGroup(Window).open();
    	}
	});
 } else {
            alert('ログインできないでーすユーザくつくりまーす！:\\n' +
                ((e.error && e.message) || JSON.stringify(e)));
    
        }
   	});
   //});


}	


})();
