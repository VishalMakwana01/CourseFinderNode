var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser')
var db = require('../db')
const jwt = require('jsonwebtoken')


router.use(bodyParser.json())
//router.use(bodyParser.urlencoded({ extended: true }))

/* GET users listing. */
router.post('/', function (req, res, next) {
    const course = {
        "Course Id": "",
        "Teacher_Id": req.body.teacher_id,
        "Name": req.body.name,
        "Tags": req.body.tags,
        "Source": req.body.source,
        "Type": req.body.type,
        "URL": req.body.url
    }
    db.query('Insert into courses Set ?', course, function (error, results) {
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

});

module.exports = router;