import React from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import {debounce} from '../../../utils/utilsFunctions';
import {MdHighlightOff} from 'react-icons/md'
import './formView.scss'

export default function FromViewer({fields , setfields , viewMode= false , onSubmit , disableForm = false}){

    function removeFiled(e){
        const newfields = fields.filter( item => item.name !== e.currentTarget.previousElementSibling.id)
        setfields(newfields);
    }

    const changeHendler = debounce((value, name)=>{
        const newfields =  fields.map(filed=> {
            if(filed.name === name){
                filed.value = value;
            }
            return filed;
        })  
        setfields(newfields);
    }, 500) 
    
    return(
        <>
            {viewMode && <small>You'r in preview mode <em className="intro">- hover the filed for remove</em></small>}
            <Form>
                {
                    fields.map( ({name , label, type , value = null})=> 
                        <Form.Group key={name} controlId={name} className="builderFormGroup">
                            <Form.Label>{label}</Form.Label>
                            <Form.Control 
                                type={type} 
                                placeholder={label} 
                                name={name} 
                                defaultValue={value} 
                                disabled={viewMode} 
                                onChange={(e)=>changeHendler(e.target.value, e.target.id)}
                            />
                            {viewMode && <MdHighlightOff className="removeFiledBtn" onClick={removeFiled}/>}
                        </Form.Group>
                    )
                }
                
            </Form>
            <Button variant={viewMode? 'success' : 'primary'} type="submit" onClick={onSubmit} disabled={disableForm}>
               {viewMode? 'Publish Form' : 'Submit'} 
            </Button>
        </>
    )
}