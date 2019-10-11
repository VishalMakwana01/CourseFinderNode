var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser')
var db = require('../db')
var jwt = require("jsonwebtoken")


router.use(bodyParser.json())
//router.use(bodyParser.urlencoded({ extended: true }))

/* GET users listing. */
router.post('/', function (req, res, next) {

    var sql = "SELECT * FROM courses";
    db.query(sql, function (err, rows, fields) {
        if (err) {
            res.status(500).send({ error: 'Something failed!' })
        }
        res.json({ rows })
    })
}
)
router.post('/enroll/', function (req, res, next) {
    console.log("In enroll")
    var sql;
    var enroll;
    if (req.body.type == "bookmark") {
        sql = "Insert into bookmark Set ?"
        enroll = {
            "Course_id": req.body.course_id,
            "Student_id": req.body.student_id,
        }
    }
    else {
        sql = "Insert into enrolled set ?"
        enroll = {
            "Course_id": req.body.course_id,
            "Student_id": req.body.student_id,
            "Start_date": req.body.start_date,
            "End_date": req.body.end_date
        }
    }
    console.log(req.body.course_id)

    db.query(sql, enroll, function (error, results) {
        if (error) {
            console.log(error)
            res.json({
                "code": 400,
                "failed": "error occured"
            })
        } else {
            res.json({
                "code": "200",
                "message": "Success"
            })
        }
    })
})


router.post('/my_enrollment/', function (req, res, next) {
    console.log("In enroll")
    var sql;
    if (req.body.type == "bookmark") {
        sql = "Select  * from courses as c,bookmark as b where c.Course_id=b.Course_id and Student_id=?"
    }
    else {
        sql = "Select  * from courses as c,enrolled as b where c.Course_id=b.Course_id and Student_id=?"
    }
    db.query(sql, req.body.student_id, function (error, results) {
        if (error) {
            console.log(error)
            res.json({
                "code": 400,
                "failed": "error occured"
            })
        } else {
            if (results.length === 0) {
                res.json({
                    "message": "No enrollments"
                })
            }
            else {
                res.json(results)
            }
        }
    })
})
module.exports = router;