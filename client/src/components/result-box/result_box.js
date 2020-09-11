import React from 'react'
import { useHistory} from 'react-router-dom'
import './result_box.scss'
import Button from '../buttons/button'

const ResultBox = ({user}) => {
  const history = useHistory()
  return  (<div className='result__box'>
  <div className='result__group-1'>
    <span className='result__name'>{user.name}  {user.surname}</span>
    <span className='result__img'>
        <img src={user.avatarUrl}  /> 
    </span>
    </div>
  <div className='result__group-2'>
   <p>
   <strong>Current Locaion:</strong> {user.currentLocation}
   </p>     
   <p>
   <strong>From: </strong> {user.from}    
   </p>     
   <p>
   <strong>Country:</strong>  {user.country}  
   </p>     
   <p>
   <strong>Bio:</strong>{user.bio.slice(0, 100) + '...'}    
   </p>       
  </div>
  <Button value='Read profile' onClick={() => history.push(`/profile/${user.id}`)} />
</div>)
}

export default ResultBox