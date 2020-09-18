import React,{Fragment} from 'react'
import './inputs_componenents.scss'


const TextInputComponent = ({type,handleChange,label, ...props}) => (<Fragment>
 {label ?<label className='label' htmlFor={{type}}>{label}</label> : null} 
<input  {...props} id={`${label ? label : ''}`} type={type} onChange={handleChange} className='text__input'/>
</Fragment>)


export default TextInputComponent

