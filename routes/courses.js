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
    var sql = "Insert into enrolled Set ?"
    console.log(req.body.course_id)
    var enroll = {
        "Course_id": req.body.course_id,
        "Student_id": req.body.student_id,
        "Start_date": req.body.start_date,
        "End_date": req.body.end_date
    }
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
    db.query("Select Course_id,Start_date,End_date from enrolled where Student_id=?", req.body.student_id, function (error, results) {
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