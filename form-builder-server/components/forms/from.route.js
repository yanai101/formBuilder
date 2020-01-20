const express = require('express');
let router = express.Router();

const formActions = require('./form.actions');

router.route('/')
    .post(formActions.add_form_data)
    .get(formActions.get_form_list);

router.route('/:id')  
    .get(formActions.get_form)

module.exports = router;