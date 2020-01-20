import React, { useState, useRef } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';
import './formBuilderModal.scss'
import { replaceEmptySpace } from '../../../utils/utils';
import { FIELDS_TYPE } from '../../../config/config';

const fieldsTypes = Object.values(FIELDS_TYPE);

export default function AddFieldModal({show ,toggleVisible , fields, setFields}) {

  const [formError, setError] = useState('');
  const inputType = useRef(null);
  const inputLabel = useRef(null);
  const inputName = useRef(null);

  function resetFields(){
    inputType.current.value = 'text';
    inputLabel.current.value ='';
    inputName.current.value = '';
  }

  function isDuplicateFields(name, label){
    const isDuplicate = fields.every(field => field.name !== name && field.label !== label);
    !isDuplicate && setError('you used with this label or name before');
    return isDuplicate;
  }

  function isInputsFormValid(type, label, name){
        let validForm = type && label && name ? true : false;

        !validForm && setError('All filed are required');

        if(validForm && fields.length) {
            validForm = isDuplicateFields(name , label);
        }
        return validForm;
    }

     function addField(){
        setError('');
        const type = inputType.current.value , 
            label = inputLabel.current.value,
             name =  replaceEmptySpace(inputName.current.value, '_')

        const isValidForm = isInputsFormValid(type, label, name);

        if(isValidForm){
           const newFields = [...fields , {type , label , name}] 
           setFields(newFields);
           resetFields(); 
        }    
    }
  
    return (
      <>  
        <Modal show={show} onHide={resetFields}>
          <Modal.Header>
            <Modal.Title>Add form fields </Modal.Title>
          </Modal.Header>
          <Modal.Body className='formBuilderModal'>
              <p>
                  <label htmlFor="fieldType">Select filed Type</label>
                  <select name="fieldType" id="fieldType" ref={inputType}>
                      {
                          fieldsTypes.map((filedType, index)=><option key={index} value={filedType.toLowerCase()}>{filedType}</option>)
                      }
                  </select>
                </p>
                <p>
                  <label htmlFor="fieldLabel">Filed label</label>
                  <input name="fieldLabel" id="fieldLabel" ref={inputLabel}/>
                </p>
                <p>
                  <label htmlFor="fieldName">Filed name</label>
                  <input name="fieldName" id="fieldName" ref={inputName}/>
                </p>
                <Alert variant="warning" show={ formError.length > 0}>{formError}</Alert>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={toggleVisible}>
              Close
            </Button>
            <Button variant="primary" onClick={addField}>
              Add
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  }
