import React from 'react'
import './inputs_componenents.scss'

const SelectComponent = ({handleChange,options,label,...props}) => (<div className='select_container w-100'>
    {label ?<label className='label form-label' htmlFor={'s'}>{label}</label> : null} 
       <select className='form-select ' id='s' onChange={handleChange} {...props} >
           {options.map(option => <option key={option} value={option}>
                 {option}
           </option>)}
       </select>
</div>)

export default SelectComponent