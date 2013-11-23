var http = require("http");
var socketio = require("socket.io");
var fs = require("fs");

var server = http.createServer(function(req, res) {
    //res.writeHead(200, {"Content-Type":"text/html"});
    //var output = fs.readFileSync("./index.html", "utf-8");
    //res.end(output);
    console.log("test");
}).listen(process.env.VMC_APP_PORT || 8080);

var io = socketio.listen(server);

io.sockets.on("connection", function (socket) {
    console.log("test");

    socket.on("C_to_S_message", function (data) {
        io.sockets.emit("S_to_C_message", {value:data.value});
    });

    socket.on("C_to_S_broadcast", function (data) {
        socket.broadcast.emit("S_to_C_message", {value:data.value});
    });

    socket.on("disconnect", function () {

    });
});