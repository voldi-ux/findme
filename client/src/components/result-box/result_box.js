import React from 'react'
import { useHistory} from 'react-router-dom'
import './result_box.scss'
import Button from '../buttons/button'
import {AiOutlinePhone} from 'react-icons/ai'
import {MdLocationCity} from 'react-icons/md'
import {IconContext} from 'react-icons'

const ResultBox = ({profile}) => {
  const history = useHistory()
  return  (<div className='result__box'>
  <div className='result__group-1'>
    <span className='result__img'>
        <img src={'data:image/png;base64,' + profile.avatarUrl}  /> 
    </span>
    <div className='result__details d-flex flex-column'> 
    <span className='result__name mb-1' >{profile.name}  {profile.surname}</span>
     <span className='result__title'>Mechanical Engineer </span>
    </div>
    </div>
    <div className='result__footer'> 
    <IconContext.Provider value={{className:'result__icon',size:'4rem'}}>  
  <div className='result__group-2'>
     <MdLocationCity />
           <span className='result__footerDetail'>
               Johannesburg
           </span>
  </div>
  <div className='result__group-2'>
     <AiOutlinePhone />
           <span className='result__footerDetail'>
               074626495
           </span>
  </div>
    </IconContext.Provider>
    </div>
  <div className='buttons'> 
  <Button value='profile' onClick={() => history.push(`/profile/${profile.userId._id}`)} />
  
  <Button value='message' outline={true} onClick={() => history.push(`/profile/${profile.userId._id}`)} />

  </div>
</div>)
}

export default ResultBox