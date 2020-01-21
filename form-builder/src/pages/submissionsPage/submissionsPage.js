import React, { useEffect, useState } from 'react';
import SubmissionsTable from '../../components/uiComponent/submissionTable/submissionTable';
import Alert from 'react-bootstrap/Alert';
import { getSubmitData } from '../../utils/apiManager';


export default function SubmissionsPage({match}){
    const [loading , setLoading]= useState(true);
    const [submitData , setSubmitData]= useState(null);
    const [loadingError , setLoadingError]= useState(false);

    useEffect(()=>{
        getSubmitData(match.params.id, 
                    (submissionData)=>{setSubmitData(submissionData)},
                    setLoadingError,
                    ()=>{setLoading(false);})
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
