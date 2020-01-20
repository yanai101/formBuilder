const mongo = require('mongodb');
const mongoose = require('mongoose');
const forms = require('./form.module');
const submit = require('../submissions/submissions.module');


exports.add_form_data = async (req, res, next) => {
    try{
        const {body} = req;
        const formExist = await forms.find({formName: body.formName}).exec();
        
        if(!formExist.length){
            const {formName, fields} = body;
            const newForm = await forms.create({formName, fields});
            const submissionForm = await submit.create({formName, formId: newForm._id, values:[]});
            if(submissionForm && newForm){
                res.json(newForm);
           }else{
                res.status(500).json({msg:`Sorry something went wrong`});   
           }
        } else {
            res.status(400).json({msg:`Form name- ${body.formName} already exist`});
        } 

    }catch(error){
        res.sendStatus(500).json(error);
        res.end() 
    }
}


exports.get_form_list = async (req, res, next) => {
    try{
        const formList = await forms.find({}).select('formName _id').exec();
        
        if(formList.length){
            res.json(formList);
        } else {
            res.status(400).json({msg:`You don't have any form to display`});
        } 

    }catch(error){
        res.sendStatus(500).json(error);
        res.end() 
    }
}

exports.get_form = async (req, res, next) => {
    const {id} = req.params;
    try{
        const form = await forms.findById(id).select('_id formName fields').exec();
        if(form){
            res.json(form);
        } else {
           res.status(400).json({msg:`Form id is invalid`});
        } 

    }catch(error){
        res.sendStatus(500).json(error);
    }
}