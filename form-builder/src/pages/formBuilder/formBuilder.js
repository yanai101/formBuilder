import React, { useState } from 'react';
import AddFiledModal from '../../components/uiComponent/addFiledModal/addFiledModal';
import FromViewer from '../../components/uiComponent/fromViewer/fromViewer';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';

import style from './formBuilder.module.scss';
import FormNameModal from '../../components/uiComponent/formNameModal/formNameModal';
import { API_URL } from '../../config/config';

export default function FromBuilder({history}){
    const [showFiledModal, setShowFiledModal] = useState(false);
    const [showFormNaneModal, setShowFormNaneModal] = useState(false);
    const [formName , setFormName] = useState('');
    const [formError, setFormError] = useState(null);
    const [fields, setfields] = useState([]);

    
    function toggleVisible(){
        setShowFiledModal(!showFiledModal)
    }

    function publishForm(){
        setShowFormNaneModal(true);
    }

    function hideFromNameModeal(submitForm = true){
        setShowFormNaneModal(false);
        submitForm && submitNewForm();
    }

    function submitNewForm(){
        setFormError(null)
        if(formName.length === 0){
            setFormError({variant:'danger', msg:'Form name Is mandatory'});
        } else {
            addNewForm();    
        }
    }

    async function addNewForm(){
        const newForm = {
            formName,
            fields
        }
        setFormError(null);

       const request = await fetch(`${API_URL}/forms`,{
            method: 'post',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newForm)
       })
       const response = await request.json()


       request.status !== 200 ?  setFormError({variant:'danger', msg:response.msg}): history.push('/'); 
    }

    return(
        <div className={style.fromBuilder}>
            <h2>{formName ||  <span>Build your's form <small>Press the + button to add fields</small></span>}</h2>
            {formError && <Alert variant={formError.variant} show={formError.msg.length > 0}>{formError.msg}</Alert>}
            <Button  className={style.addFiledBtn} variant="success" onClick={toggleVisible} title="Add new filed">+</Button>
            <AddFiledModal show={showFiledModal} toggleVisible={toggleVisible} fields={fields} setfields={setfields}/>
            {fields.length > 0 && <FromViewer fields={fields} setfields={setfields} viewMode={true} onSubmit={publishForm}/>}
            <FormNameModal show={showFormNaneModal} setFormName={setFormName} formName={formName} hideFromNameModeal={hideFromNameModeal}/>
        </div>
    )

}