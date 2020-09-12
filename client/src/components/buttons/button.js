import React from 'react'

import './button.scss'

const Button = ({value,disable,...props}) => (<button {...props} className={`button ${disable ? 'disable':true}`}>
    {value}
</button>)

export default Button