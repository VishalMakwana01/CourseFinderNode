var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser')
var db = require('../db')



router.use(bodyParser.json())
//router.use(bodyParser.urlencoded({ extended: true }))

/* GET users listing. */
router.post('/', function (req, res, next) {
    var today = new Date();
    if (req.body.designation == "teacher") {
        var users = {
            "Teacher_id": "",
            "name": req.body.name,
            "email": req.body.email,
            "password": req.body.password,
            "department": req.body.department,
            "institute": req.body.institute,
            "created_at": today,

        }
        db.query('INSERT INTO teacher SET ?', users, function (error, results, fields) {
            if (error) {
                console.log("error ocurred", error);
                res.send({
                    "code": 400,
                    "failed": "error ocurred"
                })
            } else {
                console.log('The solution is: ', results);
                res.send({
                    "code": 200,
                    "success": "User registered sucessfully"
                });
            }
        });
    }
    else {
        var users = {
            "Student_id": "",
            "name": req.body.name,
            "email": req.body.email,
            "password": req.body.password,
            "department": req.body.department,
            "institute": req.body.institute,
            "created_at": today,

        }
        db.query('INSERT INTO student SET ?', users, function (error, results, fields) {
            if (error) {
                console.log("error ocurred", error);
                res.send({
                    "code": 400,
                    "failed": "error ocurred"
                })
            } else {
                console.log('The solution is: ', results);
                res.send({
                    "code": 200,
                    "success": "User registered sucessfully"
                });
            }
        });
    }
});

module.exports = router;