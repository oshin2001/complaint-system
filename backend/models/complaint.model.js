const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const complaintSchema = new Schema({
    roll: {type: String},
    department: {type: String},
    title: {type: String},
    detail: {type: String},
    votes: {type: Number},
    docs: {type: Array},
    private: {type: Boolean},
    resolved_student: {type: Boolean},
    resolved_department: {type: Boolean},
    status: {type: String},
    date: {type: String},
    votelist: {type: Array},
    ongoing: {type: String},
    addressed: {type: String},
    escalated: {type:Boolean}
});

const Complaint = mongoose.model('Complaint',complaintSchema);

module.exports = Complaint;