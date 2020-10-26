import React from 'react'

import './button.scss'

//SButton secondary button

const SButton = ({border,value,disable,...props}) => (
    <sapn className={`btn-sec ${border ? 'w-broder':null }`} {...props}>
        {value}
    </sapn>
)

export default SButton