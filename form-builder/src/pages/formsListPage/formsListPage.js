import React, { useEffect, useState } from 'react';
import FormTable from '../../components/uiComponent/formsTable/formsTable';
import Alert from 'react-bootstrap/Alert';
import Spinner from 'react-bootstrap/Spinner';
import { fetchFormList } from '../../utils/apiManager';

export default function FromListPage(){
    
    const [forms ,setForms] = useState([]);
    const [loading ,setLoading] = useState(true);
    const [loadingError, setLodgingError] = useState();

    useEffect(()=>{
        fetchFormList(setForms, setLodgingError , ()=>{ setLoading(false);})
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
