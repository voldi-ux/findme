import React from 'react'

import './button.scss'

const Button = ({value,...props}) => (<button {...props} className='button'>
    {value}
</button>)

export default Button