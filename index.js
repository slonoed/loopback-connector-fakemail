'use strict';

var join = require('path').join;
var fs = require('fs-extra');
var jade = require('jade');

var template = jade.compileFile(join(__dirname, './emails.jade'));

var settings;


module.exports.initialize = function(dataSource, callback) {
    dataSource.connector = new Connector(dataSource.settings);
    callback();
};

function Mail() {
}

function clone(source) {
    var target = {};

    for (var prop in source) {
        if (source.hasOwnProperty(prop)) {
            target[prop] = source[prop];
        }
    }

    return target;
}

/**
 * Write email to disk
 * @param {Object} email email instance
 * @param {Function} cb callback
 */
Mail.send = function(email, cb) {
    var fPath = settings.path || '/tmp/fakemails/';
    var now = new Date();
    var fName = now.getFullYear() + '_' +
        (now.getMonth() + 1) + '_' +
        now.getDate() + '_' +
        now.getHours() + '_' +
        now.getMinutes() + '_' +
        now.getSeconds() + '_' +
        Math.floor(Math.random() * 100);
    var fileName = join(fPath, fName + '.json');

    email = clone(email);
    email._ts = now.getTime();
    fs.outputFileSync(
        fileName,
        JSON.stringify(email, null, 4)
    );

    var emails = fs.readdirSync(fPath)
        .filter(function(name) {
            return name.match(/\.json$/);
        })
        .map(function(name) {
            return join(fPath, name);
        })
        .map(function(file) {
            return fs.readJsonFileSync(file);
        })
        .sort(function(b, a) {
            return a._ts - b._ts;
        });


    var html = template({ emails: emails });
    fs.outputFileSync(join(fPath, 'emails.html'), html);

    cb();
};
Mail.prototype.send = function(fn) {
    return this.constructor.send(this, fn);
};


function Connector(settingsP) {
    settings = settingsP;
}
Connector.prototype.DataAccessObject = Mail;
