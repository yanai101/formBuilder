const mongoose = require('mongoose');

const listSchema = new mongoose.Schema({
    type: String , 
    name: String, 
    label: String
});

const formSchema = mongoose.Schema({
 //   _id: mongoose.Schema.Types.ObjectId
    formName: { type: String, require: true },
    fields: [listSchema], 
    time: Date
}, { timestamps: true });

module.exports = mongoose.model('Forms', formSchema);