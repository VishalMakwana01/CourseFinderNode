var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser')
var db = require('../db')



router.use(bodyParser.json())
//router.use(bodyParser.urlencoded({ extended: true }))

/* GET users listing. */
router.post('/', function (req, res, next) {
    var email = req.body.email;
    var password = req.body.password;
    db.query('SELECT * FROM teacher WHERE email = ?', [email], function (error, results, fields) {
        if (error) {
            // console.log("error ocurred",error);
            res.send({
                "code": 400,
                "failed": "error ocurred"
            })
        } else {
            // console.log('The solution is: ', results);
            if (results.length > 0) {
                if (results[0].password == password) {
                    res.send({
                        "code": 200,
                        "success": "Login Sucessfull",
                        "name": results[0].Name,
                        "email": results[0].email,
                        "institute": results[0].institute,
                        "department": results[0].department,
                        "created At": results[0].created_at
                    });
                }
                else {
                    res.send({
                        "code": 204,
                        "success": "Email and password does not match"
                    });
                }
            }
            else {
                res.send({
                    "code": 204,
                    "success": "Email does not exits"
                });
            }
        }
    });
});

module.exports = router;