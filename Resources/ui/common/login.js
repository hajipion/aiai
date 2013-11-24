//
function FirstView(Window) {
    //create object instance, a parasitic subclass of Observable
    var self = Titanium.UI.createWindow({
		backgroundImage: '/images/login-back.png'
    });
    

    /////// ユーザー名欄
    // ユーザー名アイコン
	var userNameImage = Ti.UI.createImageView({
		image: '/images/login-name.png',
		width: 30,
		top:120,
		left: 60,
		layout: 'horizontal'
	});
    // ユーザー名テキストフィールド
    var userNameText = Ti.UI.createTextField({
        top : 120,
        left: 100,
        height : 'auto',
        width : '50%',
        borderStyle : Ti.UI.INPUT_BORDERSTYLE_ROUNDED,
        hintText : 'Name',
		layout: 'horizontal'
    });
    self.add(userNameImage);
    self.add(userNameText);
    
     /////// パスワード欄
    // パスワードアイコン
	var passImage = Ti.UI.createImageView({
		image: '/images/login-pass.png',
		width: 30,
		top:160,
		left: 60,
		layout: 'horizontal'
	});
    // パスワードテキストフィールド
    var passText = Ti.UI.createTextField({
        top : 160,
        left: 100,
        height : 'auto',
        width : '50%',
        borderStyle : Ti.UI.INPUT_BORDERSTYLE_ROUNDED,
        passwordMask : true,
        hintText : 'Password'
    });
    self.add(passImage);
    self.add(passText);
 
    // API呼び出し
    var button = Ti.UI.createButton({
        top : 220,
        height : 'auto',
        width : 200,
        title : 'ユーザー作成',
		backgroundImage: '/images/back-login-button.png'
    });
 
    var Cloud = require('ti.cloud');
    Cloud.debug = true;
 
    var username;
    var pass;
 
    // ユーザー作成API呼び出し
    button.title = 'ログイン';
    button.addEventListener('click', function(e) {
    	 var ApplicationTabGroup =require('ui/common/ApplicationTabGroup');
				
        username = userNameText.value;
        //usernameを保存
        Ti.App._username = username;
        pass = passText.value;
        
        Cloud.Users.login({
        login:    username,
        password: pass
   			 }, function (e) {
        if (e.success) {
            var user = e.users[0];
            alert('Success:\\n' +
                'id: ' + user.id + '\\n' +
                'first name: ' + user.first_name + '\\n' +
                'last name: ' + user.last_name);
            
				new ApplicationTabGroup(Window).open();
        } else {
            alert('だめ:\\n' +
                ((e.error && e.message) || JSON.stringify(e)));
             Cloud.Users.create({
            username : username,
            password : pass,
            password_confirmation : pass
        }, function(e) {
            if (e.success) {
            	
                // 作成後に表示するWindow
                var resultWindow = Ti.UI.createWindow({
                    backgroundColor : '#ffffff'
                });
                var messageLabel = Ti.UI.createLabel({
                    top : 10,
                    width : 'auto',
                    height : 'auto',
                    text : 'ユーザーを作成しました。'
                });
                
				new ApplicationTabGroup(Window).open();
				
            } else {
                alert('Faild to create user! ' + e.message);
            }
        });
        }
   	});
        
        
        
        
       
    });
    
    
    self.add(button);
    
    return self;
}
 
module.exports = FirstView;
