import React from 'react';
import Table from 'react-bootstrap/Table';

export default function SubmissiomTable({submitData}){

    
    const tableHEader = submitData.values[0].map(value=>(
        <th key={value.type}>{value.label}</th>
        ))
        
    const tableList = submitData.values.map((formsArray, formIndex) =>(
                        <tr key={formIndex}>
                            { formsArray.map((filedValue, filedIndex)=>{
                                    const keyIndex = `form${formIndex}-${filedIndex}`;
                                    return <td key={keyIndex}>{filedValue.value}</td>
                                })
                            }
                        </tr>
            )        
        );
    

return(
    <Table striped hover responsive> 
        <thead>
            <tr>
                {tableHEader}
            </tr>
        </thead>
        <tbody>
           {tableList}
        </tbody>
    </Table>
)

}