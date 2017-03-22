var colored_console = require('./colored_console.js')
var uuid4 = require('uuid/v4')

var cap_threshold = 10
var port_testing = 8888
var port_production = 3000

module.exports = function (options, actions) {

    var opts = options || {}
    var baseUrl = opts.baseUrl || 'http://127.0.0.1'
    var port = +opts.port || (opts.testing ? port_testing : port_production)
    var cap = opts.cap || cap_threshold
    var portCap = port + cap

    var generate_server_uuid = function () {
        return uuid4();
    }

    var create_instance = {

    }

    var defaultData = {
        port: port,
        base: baseUrl + ':' + port,
        actions: {},
        reconnect: function () {
            var oldBaseUrl = this.base

            this.port = this.port + 1

            if (this.port > portCap) {
                colored_console.log_warning('se ha superado el limite de puertos reservados para las instancias que se quieren manejar', portCap)
                this.port = port
            }

            this.base = baseUrl + ':' + this.port

            if (!opts.testing) {
                console.log('El servidor que se encontraba en', oldBaseUrl, 'parece estar caído, pasando a', this.base)
            }

            setActionsTo(this, actions)

            return this.port
        }
    }

    setActionsTo = function (object, actions) {

    }

}