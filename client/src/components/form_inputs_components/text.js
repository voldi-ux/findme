import React from 'react'
import './inputs_componenents.scss'


const TextInputComponent = ({type, ...props}) => (<input  {...props} type={type} className='text__input'/>)


export default TextInputComponent

