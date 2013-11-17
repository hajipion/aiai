var view = Ti.UI.createView();

var label = Ti.UI.createlabel({
	text: "Hello",
	height: 32,
	width:150,
	top:120
});

var button = Ti.UI.createButton({
	title: "push ",
	top: 180,
	width: 100,
	height: 32
});
button.addEventListener("click", function(e){
	alert("you pushed me!");
});

view.add(label);

window.add(view);
