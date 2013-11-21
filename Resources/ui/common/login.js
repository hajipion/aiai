//
function FirstView() {
    //create object instance, a parasitic subclass of Observable
    var self = Ti.UI.createView();
 
    // ユーザー名欄
    var userNameText = Ti.UI.createTextField({
        top : 10,
        height : 'auto',
        width : '90%',
        borderStyle : Ti.UI.INPUT_BORDERSTYLE_ROUNDED,
        hintText : 'Name'
    });
    self.add(userNameText);
 
    // パスワード欄
    var passText = Ti.UI.createTextField({
        top : 50,
        height : 'auto',
        width : '90%',
        borderStyle : Ti.UI.INPUT_BORDERSTYLE_ROUNDED,
        passwordMask : true,
        hintText : 'Password'
    });
    self.add(passText);
 
    // API呼び出し
    var button = Ti.UI.createButton({
        top : 100,
        height : 'auto',
        width : 200,
        title : 'ユーザー作成'
    });
 
    var Cloud = require('ti.cloud');
    Cloud.debug = true;
 
    var username;
    var pass;
 
    // ユーザー作成API呼び出し
    button.title = 'ユーザー作成';
    button.addEventListener('click', function(e) {
        username = userNameText.value;
        pass = passText.value;
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
                resultWindow.add(messageLabel);
                resultWindow.open();
            } else {
                alert('Faild to create user! ' + e.message);
            }
        })
    });
    self.add(button);
    return self;
}
 
module.exports = FirstView;
