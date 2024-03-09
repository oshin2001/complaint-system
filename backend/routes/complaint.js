const router = require('express').Router();
let Complaint = require('../models/complaint.model');


function getCurrentDate() {
    const separator = "-";
    let newDate = new Date();
    let date = newDate.getDate();
    let month = newDate.getMonth() + 1;
    let year = newDate.getFullYear();

    return `${year}${separator}${month < 10 ? `0${month}` : `${month}`}${separator}${date}`
}

router.route('/add').post((req, res) => {
    const roll = req.body.roll;
    const title = req.body.title;
    const detail = req.body.detail;
    const department = req.body.department;
    const docs = req.body.docs;
    const private = req.body.private;

    const newComplaint = new Complaint({
        resolved_student: false,
        resolved_department: false,
        roll,
        department,
        title,
        detail,
        docs,
        status: "Not Started",
        date: getCurrentDate(),
        votes: 1,
        votelist: [roll],
        ongoing: "",
        addressed: "",
        private: private,
        escalated: false
    });

    newComplaint.save((err, result) => {
        if (err) {
            console.log(err);
        }
        else {
            res.send({ message: "1" });
        }
    });
});

router.route('/update').post((req, res) => {
    const id = req.body._id;
    var myquery = { _id: id };
    var newvalues = { $set: req.body }
    Complaint.updateOne(myquery, newvalues, function (err, res1) {
        if (res1) {
            res.send({ message: "1" })
        }
    })
});

router.route('/delete').post((req, res) => {

    Complaint.remove({ _id: req.body._id }, function (err) {
        if (!err) {
            res.send({ message: "1" })
        }
    });
});

router.route('/get').get((req, res) => {
    const query = req.query

    Complaint.find(query)
        .sort({ votes: -1 })
        .then(complaintData => res.json(complaintData))
        .catch(err => res.status(400).json('Error: ' + err));
});


module.exports = router;