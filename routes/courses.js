var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser')
var db = require('../db')



router.use(bodyParser.json())
//router.use(bodyParser.urlencoded({ extended: true }))

/* GET users listing. */
router.get('/', function (req, res, next) {
    var sql = "SELECT * FROM courses";
    db.query(sql, function (err, rows, fields) {
        if (err) {
            res.status(500).send({ error: 'Something failed!' })
        }
        res.json(rows)
    })
});

module.exports = router;