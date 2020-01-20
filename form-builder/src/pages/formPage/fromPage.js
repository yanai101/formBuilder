import React, {useEffect, useState}  from 'react';
import { API_URL, FIELDS_TYPE } from '../../config/config';
import Spinner from 'react-bootstrap/Spinner';
import FromViewer from '../../components/uiComponent/fromViewer/fromViewer';
import isEmail from 'validator/lib/isEmail';
import isMobilePhone from 'validator/lib/isMobilePhone';
import isFloat from 'validator/lib/isFloat';
import isHexColor from 'validator/lib/isHexColor';
import escape from 'validator/lib/escape';
import Alert from 'react-bootstrap/Alert';

import './from.scss';

let invalidMessages = [];

export default function From({match , history}){
    const [form, setForm] = useState(null);
    const [loading, setLoading] = useState(true);
    const [fields , setFields] = useState([]);
    const [errorMessage , setErrorMessage] = useState();
    const [invalidFormMessages , setFormMessages] = useState([]);

    useEffect(()=>{
        async function fetchForm(){
            try {
                const response = await fetch(`${API_URL}/forms/${match.params.id}`);
                const formData = await response.json();
                setLoading(false);
                setForm(formData);
                setFields(formData.fields);
            } catch (error) {
                setErrorMessage(error.msg)
            }
        }

        fetchForm();
    },[match.params.id])
    

    function validateFormInputs(){
        setFormMessages([]);
        invalidMessages = [];
        fields.map(field=>{
            field.value = ValidateAndEscapeInput(field.type , field.value)
            return field;
        })
        setFormMessages(invalidMessages);
        if(invalidMessages.length === 0){
            submitForm();
        }
    }

    async function submitForm(){
        const {formName ,_id } = form;
        const formSubmit = {
            formName,
            formId: _id,
            fields
        }
      
        const response =  await fetch(`${API_URL}/submissions/`,{
            method: 'post',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formSubmit)
        }).catch((error)=>{
            setFormMessages([error.msg])
        });

        if(response.status === 200){
            history.push('/')
        }

    }

  
    function ValidateAndEscapeInput(type, value){
        switch (type) {
            case FIELDS_TYPE.EMAIL.toLowerCase():
                if(value && isEmail(value)){
                    return escape(value)
                } 
                invalidMessages =[...invalidMessages , 'Email is invalid'];
                break;
            case FIELDS_TYPE.NUMBER.toLowerCase():
                    if(value && isFloat(value)){
                        return escape(value)
                    }
                    invalidMessages =[...invalidMessages, 'Number input is invalid'];
                break;    
            case FIELDS_TYPE.TEL.toLowerCase():
                    if(value && isMobilePhone(value)){
                        return escape(value)
                    } 
                    invalidMessages =[...invalidMessages , 'Tel number is invalid'];
                break;    
            case FIELDS_TYPE.COLOR.toLowerCase():
                    if(value && isHexColor(value)){
                        return escape(value)
                    } 
                    invalidMessages =[...invalidMessages , 'Color value invalid'];
                break;    
            default:
                if(value && value.length > 0) {
                    return escape(value)
                }
                invalidMessages =[...invalidMessages , `value ${type} is empty`];
        }

    }

    return(
        <div>
            <h2>{loading ? <Spinner animation="border" variant="primary" /> : form && form.formName}</h2>
            {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}
            <div className="formContainer">
                {
                    invalidFormMessages.length > 0 && 
                    <div className="formMessageArea">
                        <Alert variant="warning">
                            <ul className="formMessages">
                                {invalidFormMessages.map((message,index)=> <li key={index}>{message}</li>)}
                            </ul>
                            
                        </Alert>
                    </div>
                }
                {fields.length > 0 && <div className="formArea"><FromViewer fields={fields} setFields={setFields} onSubmit={validateFormInputs} /></div> }
            </div>

        </div>
    )
}
