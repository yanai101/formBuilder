import React, {useEffect, useState}  from 'react';
import { API_URL } from '../../config/config';
import Spinner from 'react-bootstrap/Spinner';
import FromViewer from '../../components/uiComponent/fromViewer/fromViewer';
import isEmail from 'validator/lib/isEmail';
import isMobilePhone from 'validator/lib/isMobilePhone';
import isFloat from 'validator/lib/isFloat';
import isHexColor from 'validator/lib/isHexColor';
import escape from 'validator/lib/escape';
import Alert from 'react-bootstrap/Alert';

import './from.scss';

let massagesArray = [];

export default function From({match , history}){
    const [form, setForm] = useState(null);
    const [loading, setLoading] = useState(true);
    const [fields , setFields] = useState([]);
    const [fromMassage , setFormMeassage] = useState([]);

    useEffect(()=>{
        async function fetchForm(){
            try {
                const response = await fetch(`${API_URL}/forms/${match.params.id}`);
                const data = await response.json();
                setLoading(false);
                setForm(data);
                setFields(data.fields);
            } catch (error) {
                
            }
        }

        fetchForm();
    },[match.params.id])
    

    function checkFileds(){
        setFormMeassage([]);
        massagesArray = [];
        fields.map(field=>{
            field.value = ValidateAndEsacpeInput(field.type , field.value)
            return field;
        })
        setFormMeassage(massagesArray);
        if(massagesArray.length === 0){
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
            setFormMeassage([error.msg])
        });

        if(response.status === 200){
            history.push('/')
        }

    }

    function ValidateAndEsacpeInput(type, value){
        switch (type) {
            case 'email':
                if(value && isEmail(value)){
                    return escape(value)
                } 
                massagesArray =[...massagesArray , 'Email is invalid'];
                break;
            case 'number':
                    if(value && isFloat(value)){
                    return escape(value)
                    }
                    massagesArray =[...massagesArray, 'Number input is invalid'];
                break;    
            case 'tel':
                    if(value && isMobilePhone(value)){
                        return escape(value)
                    } 
                    massagesArray =[...massagesArray , 'Tel number is invalid'];
                break;    
            case 'color':
                    if(value && isHexColor(value)){
                        return escape(value)
                    } 
                    massagesArray =[...massagesArray , 'Color value invalid'];
                break;    
            default:
                if(value && value.length > 0) {
                    return escape(value)
                }
                massagesArray =[...massagesArray , `value ${type} is empty`];
                break;
        }

    }

    return(
        <div>
            <h2>{loading ? <Spinner animation="border" variant="primary" /> : form && form.formName}</h2>
            <div className="formContainer">
                {
                    fromMassage.length > 0 && 
                    <div className="formMassageArea">
                        <Alert variant="warning">
                            <ul className="formMessages">
                                {fromMassage.map((massage,index)=> <li key={index}>{massage}</li>)}
                            </ul>
                            
                        </Alert>
                    </div>
                }
                {fields.length > 0 && <div className="formArea"><FromViewer fields={fields} setfields={setFields} onSubmit={checkFileds} /></div> }
            </div>

        </div>
    )
}
