import React from 'react'


const Radio = ({name,label,value,handleChange}) => (<div className='radio form-check'>
    <input id={label} type='radio' className='form-check-inpu' onChange={handleChange} value={value} name={name}/>
     <label htmlFor={label} className="form-check-label" >
         {label}
     </label>
</div>) 



export default Radio