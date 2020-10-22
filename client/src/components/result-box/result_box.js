import React from 'react'
import { useHistory} from 'react-router-dom'
import './result_box.scss'
import Button from '../buttons/button'

const ResultBox = ({profile}) => {
  const history = useHistory()
  return  (<div className='result__box'>
  <div className='result__group-1'>
    <span className='result__name'>{profile.name}  {profile.surname}</span>
    <span className='result__img'>
        <img src={profile.avatarUrl}  /> 
    </span>
    </div>
  <div className='result__group-2'>
   <p>
   <strong>Current Locaion:</strong> {profile.currentLocation}
   </p>     
   <p>
   <strong>From: </strong> {profile.town}    
   </p>     
   <p>
   <strong>Country:</strong>  {profile.country}  
   </p>     
   <p>
   <strong>Bio:</strong>{profile.bio.slice(0, 100) + '...'}    
   </p>       
  </div>
  <Button value='Read profile' onClick={() => history.push(`/profile/${profile.userId._id}`)} />
</div>)
}

export default ResultBox