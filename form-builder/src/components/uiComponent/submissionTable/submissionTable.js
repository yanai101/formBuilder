import React from 'react';
import Table from 'react-bootstrap/Table';

export default function SubmissionsTable({submitData}){

    const {values} = submitData;
    const [firstRow] = values;
    const tableHeader = firstRow.map(value=><th key={value.type}>{value.label}</th>);
        
    const tableList = values.map((formsArray, formIndex) =>(
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
                {tableHeader}
            </tr>
        </thead>
        <tbody>
           {tableList}
        </tbody>
    </Table>
)

}