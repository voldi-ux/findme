import React from 'react'
import './inputs_componenents.scss'

const SelectComponent = ({handleChange,options,...props}) => (<div className='select_container'>
       <select className='form-select ' onChange={handleChange} {...props} >
           {options.map(option => <option key={option} value={option}>
                 {option}
           </option>)}
       </select>
</div>)

export default SelectComponent