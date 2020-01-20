import React, { useEffect, useState } from 'react';
import { API_URL } from '../../config/config';
import FormTable from '../../components/uiComponent/formsTable/formsTable';
import Alert from 'react-bootstrap/Alert';
import Spinner from 'react-bootstrap/Spinner';

export default function FromList(){
    
    const [forms ,setForms] = useState([]);
    const [loading ,setLoading] = useState(true);
    const [loadingError, setLodgingError] = useState();

    useEffect(()=>{
        async function fetchFormList(){
            try {
                const response = await fetch(`${API_URL}/submissions`);
                const data = await response.json();
                setForms(data);
                setLoading(false);
            } catch (error) {
                setLodgingError(error.msg);
                setLoading(false);
            }
        }
       fetchFormList();
    },[])

    return(
        <div>
            <h2>{loading ? <span><Spinner animation="grow" />loading...</span> :'form list'}</h2>
            {!loading && forms.length ? 
                <FormTable formList={forms}/> : 
                <Alert variant="info">{loadingError ? loadingError : 'There is no forms yet'}</Alert>}
        </div>
    )
}
