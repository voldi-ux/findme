import React from 'react'

import './result_box.scss'
import Button from '../buttons/button'

const ResultBox = () => (<div className='result__box'>
  <div className='result__group-1'>
    <span className='result__name'>Voldi M</span>
    <span className='result__img'>
        <img src='https://images.vexels.com/media/users/3/145908/preview2/52eabf633ca6414e60a7677b0b917d92-male-avatar-maker.jpg'  /> 
    </span>
    </div>
  <div className='result__group-2'>
   <p>
   <strong>Current Locaion: Boston</strong>    
   </p>     
   <p>
   <strong>From: Boston</strong>    
   </p>     
   <p>
   <strong>Country:USA</strong>    
   </p>     
   <p>
   <strong>Bio: hey, i'm voldi from Boston, currently reside in Toyanto.....</strong>    
   </p>       
  </div>
  <Button value='read profile' />
</div>)

export default ResultBox