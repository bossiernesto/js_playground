var port = 3011;
var timeout = 6000;

var server = require('http').createServer().listen(port, function () {
    console.log("Server 2 listening on port " + port);
});

var io = require('socket.io').listen(server).set("log level", 0);

io.sockets.on("connection", function (socket) {
    var device = socket.request.connection.remoteAddress;
    console.log('Server 2: Incoming connection from ' + device + ' at ');
    socket.on("echo", function (msg, callback) {
        console.log(msg);
        callback(msg);
    });
});

function sendHeartbeat() {
    console.log("Sending heartbeat to clients");
    client.emit("echo", "Hello World from Server 2", function (message) {
        console.log('Echo received: ', message);
    });
}


var ioc = require('socket.io-client');
var client = ioc.connect("http://localhost:" + 3001);

client.once("connect", function () {
    console.log('Client: Connected to port ' + 3001);

    setInterval(sendHeartbeat, timeout)
});