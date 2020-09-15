import React from 'react'

import './button.scss'

const Button = ({value,disable,...props}) => (<button {...props} className={`button ${disable ? 'disable':true}`}> {console.log(props)}
    {value}
</button>)

export default Button