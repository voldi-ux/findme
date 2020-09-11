import React from 'react'
import './inputs_componenents.scss'

const RangeComponent = ({handleChange, ...props}) => (<div className='range_container'>
       <input onChange={handleChange} name='age' type='range' min='1' max='100' step='1' />
</div>)

export default RangeComponent