import { API_URL } from "../config/config";

export async function fetchFormList(successCb , errorCb , finlayCb){
    try {
        const response = await fetch(`${API_URL}/submissions`);
        const data = await response.json();
        successCb(data);
    } catch (error) {
        errorCb(error.msg);
    } finally {
        finlayCb();
    }
}

export async function addFormRequest(formData, successCb , errorCb , finlayCb){
    try {
        const addFormRequest = await fetch(`${API_URL}/forms`,{
                method: 'post',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData)
        });
        const response = await addFormRequest.json();
        addFormRequest.status !== 200 ? errorCb(response.msg): successCb();  
    } catch (error) {
        errorCb(error.msg);
    } finally {
        finlayCb && finlayCb();
    }
}

export async function fetchForm(formId, successCb , errorCb){
    try {
        const response = await fetch(`${API_URL}/forms/${formId}`);
        const formData = await response.json();
        successCb(formData);
    } catch (error) {
        errorCb(error.msg)
    }
}


export async function fetchFormSubmit(formSubmit, successCb, errorCb){
    try {
        const response =  await fetch(`${API_URL}/submissions/`,{
            method: 'post',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formSubmit)
        })
        
        response.status === 200 ?successCb() : errorCb(['something went wrong '])
    } catch (error) {
        errorCb([error.msg])
    }
}


export async function getSubmitData (formId, successCb , errorCb , finlayCb){
    try {
        const result = await fetch(`${API_URL}/submissions/${formId}`)
        const submissionData = await result.json(); 
        successCb(submissionData);
    } catch (error) {
        errorCb(error.msg)
    } finally {
        finlayCb();
    }
}
