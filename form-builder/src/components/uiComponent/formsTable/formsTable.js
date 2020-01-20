import React from 'react';
import {Link} from 'react-router-dom';
import Table from 'react-bootstrap/Table';
import {FaWpforms, FaUsers} from 'react-icons/fa';


export default function FormTable({formList}){

const formsItems = formList.map(({_id:formSubmit}) => (
                                <tr key={formSubmit.formId}>
                                    <td>{formSubmit.formId}</td>
                                    <td>{formSubmit.formName}</td>
                                    <td>{formSubmit.total}</td>
                                    <td><Link to={`/form/${formSubmit.formId}`}><FaWpforms/> View</Link></td>
                                    <td>{
                                        formSubmit.total ? <Link to={`/submissions/${formSubmit.formId}`}><FaUsers/> View</Link>: <em>No submissions yet</em>
                                        }
                                    </td>
                                </tr>)
)    

return(
    <Table striped hover responsive> 
        <thead>
            <tr>
                <th>Form Id</th>
                <th>Form Name</th>
                <th> Submissions</th>
                <th>Submit Page</th>
                <th>Submissions Page</th>
            </tr>
        </thead>
        <tbody>
           {formsItems}
        </tbody>
    </Table>
)

}