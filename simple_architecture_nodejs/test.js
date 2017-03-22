var colored_console = require('./colored_console.js')
var r = require('./request_wrapper.js')

var supervisor = "http://127.0.0.1:4040"

var express = require('express')
var app = express()
var bodyParser = require('body-parser')


colored_console.log_error("Un error")
colored_console.log_info("Un mensaje de informacion")


//
// Heartbeat

app.route('/heartbeat')
    .get(function (req, res) {
        res.json({})
    })


r.post(supervisor + '/register', {url: "http://127.0.0.1:3000"}).then(function (response) {
    colored_console.log_info('Registered successfully (?): ' + response.status)
})


var port = 3000
var server = app.listen(port, function () {

    colored_console.log_info("Initializing node in port " + server.address().port + "....")
})
