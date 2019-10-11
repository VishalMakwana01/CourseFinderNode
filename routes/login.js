var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser')
var db = require('../db')
const jwt = require('jsonwebtoken')


router.use(bodyParser.json())
//router.use(bodyParser.urlencoded({ extended: true }))

/* GET users listing. */
router.post('/', function (req, res, next) {
    var email = req.body.email;
    var password = req.body.password;
    var sql;
    if (req.body.type == "student") {
        sql = "Select * from student where email =?"
    }
    else {
        sql = "Select * from teacher where email = ?"
    }
    db.query(sql, [email], function (error, results, fields) {
        if (error) {
            // console.log("error ocurred",error);
            res.json({
                "code": 400,
                "failed": "error ocurred"
            })
        } else {
            // console.log('The solution is: ', results);
            if (results.length > 0) {
                if (results[0].password == password) {
                    const user = {
                        "name": results[0].Name,
                        "email": results[0].email,
                        "institute": results[0].institute,
                        "department": results[0].department,
                        "created At": results[0].created_at
                    }
                    jwt.sign({ user }, 'pubgmobile', (err, token) => {
                        res.json({
                            "code": 200,
                            "success": "Login Successfull",
                            data: {
                                "name": results[0].Name,
                                "email": results[0].email,
                                "institute": results[0].institute,
                                "department": results[0].department,
                                "created At": results[0].created_at
                            },
                            token
                        });
                    })

                }
                else {
                    res.json({
                        "code": 204,
                        "success": "Email and password does not match"
                    });
                }
            }
            else {
                res.json({
                    "code": 204,
                    "success": "Email does not exits"
                });
            }
        }
    });
});

module.exports = router;