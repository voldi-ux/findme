import React from 'react'


const Radio = ({name,label,value,handleChange}) => (<div className='radio'>
    <input id={label} type='radio' onChange={handleChange} value={value} name={name}/>
     <label htmlFor={label}>
         {label}
     </label>
</div>) 



export default Radio