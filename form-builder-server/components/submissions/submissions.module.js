const mongoose = require('mongoose');

const listSchema = new mongoose.Schema({
    type: String , 
    name: String, 
    label: String,
    value: String
});

const submitSchema = mongoose.Schema({
    formName: { type: String, require: true },
    formId: {type:mongoose.Schema.Types.ObjectId , ref:'Forms'},//{type: String},
    values: [[listSchema]], 
}, { timestamps: true });

module.exports = mongoose.model('Submit', submitSchema);