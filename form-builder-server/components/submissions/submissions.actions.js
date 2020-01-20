const mongo = require('mongodb');
const mongoose = require('mongoose');
const submit = require('./submissions.module');

exports.add_submissions = async (req, res, next) => {
    try{
        const {body} = req;
        const {fields} = body;
        const updateSubmitForm =  await submit.findOneAndUpdate({formId: body.formId},{ "$push": { "values": fields } })
        res.json(updateSubmitForm);
    
    }catch(error){
        console.log(error)
        debugger
        res.sendStatus(500).json(error);
        res.end() 
    }
}


exports.get_submissions_list = async (req, res, next) => {
    try{
        const submissionList = await submit.aggregate([{$match:{}}, {$group:{_id:{formName:"$formName" ,formId:"$formId" , total: {$size:"$values"}}}},{ $sort: { "_id.formName": 1 } }]).exec();
        
        if(submissionList.length){
            res.json(submissionList);
        } else {
            res.status(400).json({msg:`You don't have any form to display`});
        } 
        
    }catch(error){
        console.log(error);
        res.sendStatus(500).json(error);
        res.end() 
    }
}

exports.get_submission_form = async (req, res, next) => {
    const {formId} = req.params;
    try{
        const submissionForm = await submit.findOne({formId}).exec();
        
        if(submissionForm){
            res.json(submissionForm);
        } else {
            res.status(400).json({msg:`Sorry, we lost this form :( )`});
        } 
        
    }catch(error){
        console.log(error);
        res.sendStatus(500).json(error);
        res.end() 
    }
}