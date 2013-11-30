
var debugMode = true;
//var loginUser = 'input user id!!';
//var password = 'input password!!';

var loginUser= Ti.App.Properties.getString('username');

var password= Ti.App.Properties.getString('pass');
 //友達変数
 Ti.App._withFriends =[];  	
 Ti.App._username =loginUser;
   	var ApplicationTabGroup =require('ui/common/ApplicationTabGroup'); 
//create database
exports.Push_and = function() {
	
        var deviceToken;

        var CloudPush = require('ti.cloudpush');
        CloudPush.debug = debugMode;
        CloudPush.enabled = true;
        CloudPush.showTrayNotificationsWhenFocused = true;
        CloudPush.showTrayNotification = true;
        CloudPush.showAppOnTrayClick = true;
        CloudPush.focusAppOnPush = false;

        var Cloud = require('ti.cloud');
        Cloud.debug = debugMode;

        //retrieve Device Token
        CloudPush.retrieveDeviceToken({
                success : function deviceTokenSuccess(e) {
                        Ti.API.info('Device Token: ' + e.deviceToken);
                        deviceToken = e.deviceToken;
                        login();
                },
                error : function deviceTokenError(e) {
                        Ti.API.info('Failed to register for push! ' + e.error);
                }
        });

        //Login
        var login = function() {
        	  //友達変数
 		Ti.App._withFriends =[];
 		var ApplicationTabGroup =require('ui/common/ApplicationTabGroup');
	
        
   		 var loginname = Ti.App.Properties.getString('username');
     //usernameを保存
   		Ti.App._username = loginname;
   		 var loginpass = Ti.App.Properties.getString('pass');
                Cloud.Users.login({
                        login : loginUser,
                        password : password
                }, function(e) {
                        if (e.success) {
                                Ti.API.info("login success");
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
				alert("friend!");
		  		var currentWithFriends = Ti.App._withFriends;
	     		 var ids = {
   					text:user.username,
   					pt:'50pt',
				};
			currentWithFriends.push(ids);
	      	Ti.App._withFriends=currentWithFriends;
		  //友達情報を読み込んでからページをopen！！
		  	//new ApplicationTabGroup(Window).open();
		  	 defaultSubscribe();
        	 }
     }else{
     		//new ApplicationTabGroup(Window).open();
     		 defaultSubscribe();
    	}
	});
                               
                        } else {
                                Ti.API.info('Error: ' + ((e.error && e.message) || JSON.stringify(e)));
                        }
                });
        };

        //Subscribe
        var defaultSubscribe = function() {
                Cloud.PushNotifications.subscribe({
                        channel : 'alert',
                        device_token : deviceToken,
                        type : 'android'
                }, function(e) {
                        if (e.success) {
                                Ti.API.info('Subscribed for Push Notification!');
                               

                        } else {
                                Ti.API.info('Error:' + ((e.error && e.message) || JSON.stringify(e)));
                        }
                });
        };
        
         /*Cloud.PushNotifications.notify({
    channel : 'alert',
    to_ids : '529778554fbf230b6a01562b',
    payload: 'Welcome to push notifications'
}, function (e) {
    if (e.success) {
        alert('Success');
    } else {
        alert('push!!!!Error:\n' +
            ((e.error && e.message) || JSON.stringify(e)));
    }
});*/


        

        //Callback when catch a Notification
        CloudPush.addEventListener('callback', function(evt) {
                var data = JSON.parse(evt.payload);
                Ti.API.info(data.android);
                showDialog(data.android.title, data.android.alert);
        });

        //Show dialog
        var showDialog = function(title, body) {
                var dialog = Titanium.UI.createAlertDialog();
                dialog.setTitle(title);
                dialog.setMessage(body);
                dialog.show();
        };

        CloudPush.addEventListener('trayClickLaunchedApp', function(evt) {
                Ti.API.info('Tray Click Launched App (app was not running)');
        });

        CloudPush.addEventListener('trayClickFocusedApp', function(evt) {
                Ti.API.info('Tray Click Focused App (app was already running)');
		});
        
       
       	
};
 
