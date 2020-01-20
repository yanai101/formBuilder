const express = require('express');
let router = express.Router();

const submitActions = require('./submissions.actions');

router.route('/')
    .post(submitActions.add_submissions)
    .get(submitActions.get_submissions_list);

router.route('/:formId')  
    .get(submitActions.get_submission_form)

module.exports = router;