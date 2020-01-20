import React  from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';


export default function FormNameModal({show ,hideFromNameModel , setFormName , fromName='' }) {

    function closeModal(){
      hideFromNameModel(false)
    } 
    
    return (
      <>  
        <Modal show={show} onHide={hideFromNameModel}>
          <Modal.Header>
            <Modal.Title>Please add form name </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <input name="formName" id="formName" placeholder="Add from name" onChange={(e)=> setFormName(e.target.value)}/>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={closeModal}>
              Close
            </Button>
            <Button variant="primary" onClick={hideFromNameModel} disabled={fromName.length}>
              Submit
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  }
