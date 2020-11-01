import React from 'react'

const AddJobForm = ({submit, change, companyName, position, salary}) => {
    return (
        <form onSubmit={submit}>
            <input type="text" name="companyName" value={companyName} onChange={change}/>
            <input type="text" name="position" value={position} onChange={change}/>
            <input type="number" name="salary" value={salary} onChange={change}/> 
            <button type='submit'>ok</button>
        </form>
    )
}

export default AddJobForm
