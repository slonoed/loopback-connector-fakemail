'use strict';

var lib = require('./index');
var assert = require('assert');
var join = require('path').join;
var execSync = require('child_process').execSync;
var fs = require('fs-extra');


describe('loopback-connector-fakemail', function() {
    var dirname = join(__dirname, './emails')

    var dataSource;
    var Mail;
    var testEmail;


    beforeEach(function(done) {
        execSync('rm -rf emails');

        dataSource = {
            settings: {
                name: 'email',
                connector: 'fakemail',
                path: dirname
            }
        };

        testEmail = {
            to: 'test@gmail.com',
            from: 'noreply@127.0.0.1',
            subject: 'subject',
            html: 'html'
        };

        lib.initialize(dataSource, function() {
            Mail = dataSource.connector.DataAccessObject;

            done();
        });
    });

    function checkEmail() {
        var files = fs.readdirSync(dirname);

        assert(files.length === 2, 'must create two files');

        var email = fs.readJsonSync(join(dirname, files[0]));

        assert(email.to === testEmail.to, 'must create json file');
        assert(email.from === testEmail.from, 'must create json file');
        assert(email.subject === testEmail.subject, 'must create json file');

    }

    it('must save email json', function(done) {
        Mail.send(testEmail, function() {
            checkEmail();
            done()
        });
    });

    it('must save instance', function(done) {
        var mail = new Mail();

        for (var p in testEmail) {
            if (testEmail.hasOwnProperty(p)) {
                mail[p] = testEmail[p];
            }
        }

        mail.send(function() {
            checkEmail();
            done()
        });
    });

    it('must create emails.html file with email', function(done) {
        Mail.send(testEmail, function() {
            var emailsHtml = fs.readFileSync(join(dirname, './emails.html'))
                .toString();

            assert(emailsHtml.indexOf(testEmail.to) > -1);
            assert(emailsHtml.indexOf(testEmail.from) > -1);
            assert(emailsHtml.indexOf(testEmail.subject) > -1);

            done();
        });
    });

    it('must create emails.html file with all emails', function(done) {
        var secondEmail = {
            to: 'some@address.com',
            from: 'another@address.com',
            subject: 'Test leter',
            text: 'some text'
        };

        var checker = function() {
            var emailsHtml = fs.readFileSync(join(dirname, './emails.html'))
                .toString();

            assert(emailsHtml.indexOf(testEmail.to) > -1);
            assert(emailsHtml.indexOf(testEmail.from) > -1);
            assert(emailsHtml.indexOf(testEmail.subject) > -1);
            assert(emailsHtml.indexOf(secondEmail.to) > -1);
            assert(emailsHtml.indexOf(secondEmail.from) > -1);
            assert(emailsHtml.indexOf(secondEmail.subject) > -1);

            done();
        };

        Mail.send(testEmail, function() {
            Mail.send(secondEmail, checker);
        });
    });
});
