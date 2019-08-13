var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser')
var db = require('../db')
var jwt = require("jsonwebtoken")


router.use(bodyParser.json())
//router.use(bodyParser.urlencoded({ extended: true }))

/* GET users listing. */
router.post('/', verifyToken, function (req, res, next) {
    jwt.verify(req.token, "pubgmobile", (err, authData) => {
        if (err) {
            res.sendStatus(403)
        }
        else {
            var sql = "SELECT * FROM courses";
            db.query(sql, function (err, rows, fields) {
                if (err) {
                    res.status(500).send({ error: 'Something failed!' })
                }
                res.json({ rows, authData })
            })
        }
    })

});
function verifyToken(req, res, next) {
    const bearHeader = req.headers['authorization']
    if (typeof bearHeader != "undefined") {
        const bear = bearHeader.split(" ")
        const bearToken = bear[1]
        req.token = bearToken
        next()
    }
    else {
        res.sendStatus(403)
    }
}
module.exports = router;