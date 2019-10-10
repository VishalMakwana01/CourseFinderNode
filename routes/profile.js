var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser')
var db = require('../db')
const jwt = require('jsonwebtoken')


router.use(bodyParser.json())
//router.use(bodyParser.urlencoded({ extended: true }))

/* GET users listing. */
router.post('/', function (req, res, next) {
    if (req.body.student_id) {
        db.query("Select * from student where Student_id=?", [req.body.student_id], function (error, results, fields) {
            if (error) {
                res.json({
                    "code": 400,
                    "failed": "error ocurred"
                })
            } else {
                if (results.length > 0) {
                    res.json({
                        "message": "success",
                        data: {
                            "name": results[0].Name,
                            "email": results[0].email,
                            "institute": results[0].institute,
                            "department": results[0].department,
                            "created At": results[0].created_at,
                            "age": results[0].Age
                        }
                    });
                }
            }
        })
    }
    else {
        db.query("Select * from teacher where Teacher_id=?", [req.body.teacher_id], function (error, results, fields) {
            if (error) {
                console.log(error)
                res.json({
                    "code": 400,
                    "failed": "error ocurred"
                })
            } else {
                if (results.length > 0) {
                    res.json({
                        "status": 200,
                        "message": "success",
                        data: {
                            "name": results[0].Name,
                            "email": results[0].email,
                            "institute": results[0].institute,
                            "department": results[0].department,
                            "created At": results[0].created_at,
                            "age": results[0].Age
                        }
                    });
                }
            }
        })
    }
});

router.post('/edit/', function (req, res, next) {
    var details = {
        "Name": req.body.name,
        "email": req.body.email,
        "institute": req.body.institute,
        "department": req.body.department,
        "Age": req.body.age
    }
    if (req.body.student_id) {
        db.query('Update student set ? where Student_id=?', [details, req.body.student_id], function (error, results) {
            if (error) {
                console.log(error)
                res.json({
                    "status": 400,
                    "failed": "error occured"
                })
            }
            else {
                res.json({
                    "status": 200,
                    "message": "Success"
                })
            }

        })
    }
    else {
        db.query('Update teacher set ? where Teacher_id=?', [details, req.body.teacher_id], function (error, results) {
            if (error) {
                console.log(error)
                res.json({
                    "status": 400,
                    "failed": "error occured"
                })
            }
            else {
                res.json({
                    "status": 200,
                    "message": "Success"
                })
            }

        })
    }

})

module.exports = router;