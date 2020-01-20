import React, { useEffect, useState } from 'react';
import { API_URL } from '../../config/config';
import SubmissionsTable from '../../components/uiComponent/submissionTable/submissionTable';
import Alert from 'react-bootstrap/Alert';


export default function SubmissionsPage({match}){
    const [loading , setLoading]= useState(true);
    const [submitData , setSubmitData]= useState(null);
    const [loadingError , setLoadingError]= useState(false);

    useEffect(()=>{
         const getSubmitData = async ()=>{
             //TODO try block + move api call to file
             const result = await fetch(`${API_URL}/submissions/${match.params.id}`)
                            .catch(error=>{
                                setLoadingError(error.msg)
                            })
            const submissionData = await result.json();   
            setLoading(false);
            setSubmitData(submissionData);
         }

         getSubmitData();
    },[match.params.id])

    return(
        <div>
            <h2>Form {submitData && submitData.formName} Submissions</h2>
            {loading && 'loading' }
            {
                submitData && 
                <SubmissionsTable submitData={submitData}/>
            }
            {loadingError && <Alert variant="warning">{loadingError}</Alert>}
        </div>
    )
}
