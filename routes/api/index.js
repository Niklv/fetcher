var express = require('express');
var router = express.Router();
var fetcher = require('../../controller/fetcher');
var _ = require('lodash');

router.get('/fetcher', function (req, res) {
    res.send({
        isStarted: fetcher.isStarted
    })
});

router.get('/fetcher/posts', function (req, res) {
    res.send(fetcher.posts);
});

router.post('/fetcher/start', function (req, res) {
    fetcher.start(function (err) {
        if(!err)
            res.sendStatus(200);
        else
            res.sendStatus(400);
    });
});

router.post('/fetcher/stop', function (req, res) {
    fetcher.stop(function (err) {
        if(!err)
            res.sendStatus(200);
        else
            res.sendStatus(400);
    });
});

router.get('/fetcher/settings', function (req, res) {
    res.send(fetcher.settings);
});

router.post('/fetcher/settings', function (req, res) {
    fetcher.settings.period = parseInt(req.body.period);
    if (_.isNaN(fetcher.settings.period))
        fetcher.settings.period = 0;
    res.sendStatus(200);
});

module.exports = router;
