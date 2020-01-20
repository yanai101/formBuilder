import React, { useState }  from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';


export default function FormNameModal({show ,hideFromNameModel , setFormName , fromName='' }) {
    const [disableSubmit ,setDisableSubmit] = useState(true);

    function closeModal(){
      hideFromNameModel(false)
    }
    
    function inputChangeHandler(e){
      const {value} = e.target;
      setFormName(value);
      setDisableSubmit(!value);
    }
    
    return (
      <>  
        <Modal show={show} onHide={hideFromNameModel}>
          <Modal.Header>
            <Modal.Title>Please add form name </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <input name="formName" id="formName" placeholder="Add from name" onChange={inputChangeHandler}/>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={closeModal}>
              Close
            </Button>
            <Button variant="primary" onClick={hideFromNameModel} disabled={disableSubmit}>
              Submit
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  }
