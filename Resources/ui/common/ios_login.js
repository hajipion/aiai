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
	if(Titanium.Platform.name == 'android'){
		var userNameImage = Ti.UI.createImageView({
			image: '/images/login-name.png',
			height: '100%',
			left: 0
		});
	} else {
		var userNameImage = Ti.UI.createImageView({
			image: '/images/login-name.png',
			height: '100%',
			left: -25
		});
	}
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
	if(Titanium.Platform.name == 'android'){
		var passImage = Ti.UI.createImageView({
			image: '/images/login-name.png',
			height: '100%',
			left: 0
		});
	} else {
		var passImage = Ti.UI.createImageView({
			image: '/images/login-pass.png',
			height: '100%',
			left: -25
		});
	}
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


    var button = Ti.UI.createButton({
    	color: '#fff',
        top : 20,
        height : '25%',
        width : '100%',
        title : 'ユーザー作成',
		backgroundImage: '/images/back-login-button.png'
    });
    
   

    view.add(button);
  
     
    button.title = '新規登録';
    button.addEventListener('click', function(e) {
    
    var new_username;
    var new_pass;
    new_username = userNameText.value;
    new_pass = passText.value;
    if(new_username && new_pass){
    	 create_user(new_username,new_pass );
    }else{
    	alert("入力してよ！");
    }
    
    //var nametext = Ti.App.Properties.getString('username');
    //create_user(new_username,new_pass );
        
    });
    
    
function create_user(name,pass){
	 
	//alert(name);
	
	var Cloud = require('ti.cloud');
    Cloud.debug = true;
	Cloud.Users.create({
            username : name,
            password : pass,
            password_confirmation :pass
        }, function(e) {
            if (e.success) {
				Ti.App.Properties.setString('username',  name);
    			Ti.App.Properties.setString('pass',  pass);
              
				alert("user つくった");
				login_user();
				//デバイストークンなど
				//var CloudPush4Android = require('ui/common/Push_and');
			//CloudPush4Android.Push_and();
			var ApplicationTabGroup =require('ui/common/ApplicationTabGroup');		
            //new ApplicationTabGroup(Window).open();    
			
			 
            } else {
            	//new ApplicationTabGroup(Window).open();
                alert('Faild to create user! ' + e.message);
               //new ApplicationTabGroup(Window).open();
            }
        });	
}

　　
  function login_user(){
	var Cloud = require('ti.cloud');
    Cloud.debug = true;
  
    //友達変数
	Ti.App._withFriends =[];
    // ユーザー作成API呼び出し（一回ログインしたら再度ログインしなくていいようにしないとね）
   
   	var ApplicationTabGroup =require('ui/common/ApplicationTabGroup');
	
        
    var loginname = Ti.App.Properties.getString('username');
    Ti.App._username = Ti.App.Properties.getString('username');
    var loginpass = Ti.App.Properties.getString('pass');
	Ti.App.Properties.setString('username',   loginname);
        Cloud.Users.login({
        login:    loginname,
        password: loginpass
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
   
        }
   	});
   


}	

    self.add(view);

    return self;
}

module.exports = FirstView;
