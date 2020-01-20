import React, { useEffect, useState } from 'react';
import { API_URL } from '../../config/config';
import SubmissiomTable from '../../components/uiComponent/submissionTable/submissionTable';
import Alert from 'react-bootstrap/Alert';


export default function Submissions({match}){
    const [loading , setLoading]= useState(true);
    const [submitData , setSubmitData]= useState(null);
    const [loadingError , setLoadingError]= useState(false);

    useEffect(()=>{
         const featcSubmitData = async ()=>{
             const result = await fetch(`${API_URL}/submissions/${match.params.id}`)
                            .catch(error=>{
                                setLoadingError(error.msg)
                            })
            const submitionData = await result.json();   
            setLoading(false);
            setSubmitData(submitionData);
         }

         featcSubmitData();
    },[match.params.id])

    return(
        <div>
            <h2>Form {submitData && submitData.formName} Submissions</h2>
            {loading && 'loading' }
            {
                submitData && 
                <SubmissiomTable submitData={submitData}/>
            }
            {loadingError && <Alert variant="warning">{loadingError}</Alert>}
        </div>
    )
}
