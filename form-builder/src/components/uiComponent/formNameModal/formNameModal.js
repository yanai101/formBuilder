import React  from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';


export default function FormNameModal({show ,hideFromNameModeal , setFormName , fromName='' }) {

    function closeModal(){
      hideFromNameModeal(false)
    } 
    
    return (
      <>  
        <Modal show={show} onHide={hideFromNameModeal}>
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
            <Button variant="primary" onClick={hideFromNameModeal} disabled={fromName.length}>
              Submit
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  }
