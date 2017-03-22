var uuid4 = require('uuid/v4')
var Promise = require('bluebird')
var colored_console = require('./colored_console.js')
////
// FUNCTiONS
////

var generate_uuid_id = function () {
    return uuid4()
}

////
// SERVER
////

var express = require('express')
var app = express()
var bodyParser = require('body-parser')

var registered_servers = 0
var servers = []

var r = require('./request_wrapper')

app.use(bodyParser.json())

app.route('/register')
    .post(function (req, res) {
        var id = generate_uuid_id()
        console.log(req.body)
        var url = req.body.url

        colored_console.log_info("Received registration from server ", url)

        servers[id] = {
            'url': url,
            'state': {}
        }
        registered_servers++

        r.heartbeat(url + '/heartbeat', 2000).catch(function () {
            colored_console.log_success('Received heartbeat from server')
        })

        res.json({status: 'ok'})

    })

var schedule = require('node-schedule');

var j = schedule.scheduleJob('* * * * *', function(){
    //TODO
     colored_console.log_info("Try to send a heartbeat to the servers")
});


var port = 4040
var server = app.listen(port, function () {

    colored_console.log_info("Initializing supervisor node in port " + server.address().port + "....")
})


