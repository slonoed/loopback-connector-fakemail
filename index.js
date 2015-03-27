'use strict';

var path = require('path'),
    fs = require('fs');

module.exports.initialize = function(dataSource, callback) {
    dataSource.connector = new Connector(dataSource.settings);
    callback();
};

function Mail() {}

/**
 * Write email to disk
 * @param {Object} email email instance
 * @param {Function} cb callback
 */
Mail.send = function(email, cb) {
    var data = JSON.stringify(email, null, 4),
        fileName = path.join('/tmp/fakemail/', Date.now() + '.json');

    fs.mkdir('/tmp/fakemail/', function() {
        fs.writeFile(fileName, data, cb);
    });
};
Mail.prototype.send = function(fn) {
    return this.constructor.send(this, fn);
};


function Connector(settings) {
}
Connector.prototype.DataAccessObject = Mail;
