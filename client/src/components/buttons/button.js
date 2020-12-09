import React from 'react'

import './button.scss'

const Button = ({value,outline,...props}) => (<button {...props} className={`button ${outline ? 'outline':true}`}> 
    {value ? value : props.children}
</button>)

export default Button