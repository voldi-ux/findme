import React from 'react'
import './inputs_componenents.scss'


const TextInputComponent = ({type,handleChange, ...props}) => (<input  {...props} type={type} onChange={handleChange} className='text__input'/>)


export default TextInputComponent

