//
function FirstView(Window) {
    //create object instance, a parasitic subclass of Observable
    var self = Titanium.UI.createWindow({
		backgroundImage: '/images/login-back.png'
    });

	var view = Ti.UI.createView({
		top: 120,
		layout: 'vertical',
		height: '27%',
		width: '70%'
	});
    /////// ユーザー名欄
    var nameView = Ti.UI.createView({
    	layout: 'absolute',
    	width: '100%',
    	height: '25%'
    });
    // ユーザー名アイコン
	var userNameImage = Ti.UI.createImageView({
		image: '/images/login-name.png',
		height: '100%',
		left: -25
	});
    // ユーザー名テキストフィールド
    var userNameText = Ti.UI.createTextField({
        right: 0,
        height : '100%',
        width : '80%',
        borderStyle : Ti.UI.INPUT_BORDERSTYLE_ROUNDED,
        hintText : 'Name'
    });
    nameView.add(userNameImage);
    nameView.add(userNameText);

     /////// パスワード欄
     var passView = Ti.UI.createView({
    	layout: 'absolute',
    	width: '100%',
    	height: '25%',
    	top: 10
	});
    // パスワードアイコン
	var passImage = Ti.UI.createImageView({
		image: '/images/login-pass.png',
		height: '100%',
		left: -25
	});
    // パスワードテキストフィールド
    var passText = Ti.UI.createTextField({
        right: 0,
        height : '100%',
        width : '80%',
        borderStyle : Ti.UI.INPUT_BORDERSTYLE_ROUNDED,
        passwordMask : true,
        hintText : 'Password'
    });
    passView.add(passImage);
    passView.add(passText);

    view.add(nameView);
    view.add(passView);
    //self.add(view);

    // API呼び出し
    var button = Ti.UI.createButton({
    	color: '#fff',
        top : 20,
        height : '25%',
        width : '100%',
        title : 'ユーザー作成',
		backgroundImage: '/images/back-login-button.png'
    });

    view.add(button);

    var Cloud = require('ti.cloud');
    Cloud.debug = true;

    var username;
    var pass;
    //友達変数
 	Ti.App._withFriends =[];
    // ユーザー作成API呼び出し（一回ログインしたら再度ログインしなくていいようにしないとね）
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
   					pt:'50px',
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

    self.add(view);

    return self;
}

module.exports = FirstView;
