function editProfView(_args) {
	var win = Titanium.UI.createWindow({
		title:_args.title,
		backgroundColor: "#fff"
	});
	
	// get tab group object
	var tabGroup = _args.tabGroup;


	//画像取得用api(ログイン必須)一番最新の写真が表示
	var Cloud = require('ti.cloud');
    Cloud.debug = true;
    
	Cloud.Users.showMe(function (e) {
	    if (e.success) {
	        var user = e.users[0];
	        if(user.photo){//ユーザが写真はあったら表示
	          var anImageView = Ti.UI.createImageView({
	                    image : user.photo.urls.thumb_100,
	                    width : 200,
	                    height : 200,
	                    top :  100,
	                    left : 100
	          });
			  //プロフィール画像表示（どうやらaddする場所が違うらしい・・・）
			  var anlabel = Ti.UI.createLabel();
			  anlabel.text = 'あああああ';
			  win.add(anlabel);
			  win.add(anImageView);
	        }else{
	        	//写真投稿はこちらログインしてないとエラー（実機でためさないと・・・）
				Ti.Media.openPhotoGallery({
	            	success : function(event) {
	                	Cloud.Photos.create({
	                    	photo: event.media
	                	}, function (e) {
	                    	if (e.success) {
	                        	var photo = e.photos[0];
	                        	alert('Success:\\n' +
	                            	'id: ' + photo.id + '\\n' +
	                            	'filename: ' + photo.filename + '\\n' +
	                            	'size: ' + photo.size,
	                            	'updated_at: ' + photo.updated_at
	                            );
	                    	} else {
	                        	alert('Error:\\n' +
	                        	    ((e.error && e.message) || JSON.stringify(e))
	                        	);
	                    	}
	                	});
	            	},
	            	mediaTypes : [Ti.Media.MEDIA_TYPE_PHOTO]
	       	 	});
				//写真投稿ここまで
	        }
	    } else {
	        alert('Error:\n' +
	            ((e.error && e.message) || JSON.stringify(e))
	        );
	    }
	});

	return win;
};

module.exports = editProfView;