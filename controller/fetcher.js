var repeat = require('repeat');
var request = require('request');
var _ = require('lodash');
var schema_parser = require('semantic-schema-parser');

var fetcher = {
    isStarted: false,
    posts: [],
    settings: {
        period: 1
    },
    parse: function (done) {
        console.log("parse");
        request('http://bitcoinwarrior.net/', function(err, res, body){
            if(err)
                return done();
            schema_parser.parseContent(body, function(parsedData){
                if(parsedData == null || parsedData.elems == null)
                    return done();
                fetcher.posts = _.chain(parsedData.elems).filter("article").map(function(el){
                    var post = {}
                    for(var i in el.article)
                        _.merge(post, el.article[i]);

                    return post;
                }).value();
                done();
            });
        });
    },
    start: function (cb) {
        if (this.isStarted)
            return cb && cb(new Error("Already started"));

        if (this.settings.period <= 0)
            return cb && cb(new Error("Wrong settings to start"));

        this.isStarted = true;
        repeat(this.parse).every(this.settings.period, 'm').until(function () {
                return !fetcher.isStarted;
        }).start();
        cb && cb();

    },
    stop: function (cb) {
        if (!this.isStarted)
            return cb && cb(new Error("Already stopped"));
        this.isStarted = false;
        cb && cb();
    }
};

module.exports = fetcher;
