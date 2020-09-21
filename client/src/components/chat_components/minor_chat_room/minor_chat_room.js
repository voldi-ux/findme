import React from 'react';
import {useHistory} from 'react-router-dom'

import './minor_chat_room.scss'

const MinorRoom =  ({match, id,user}) => {
   const history = useHistory()

    return <div className='minor__container' onClick={()=> history.push(`${match.path}/singlechat/${id}`)}>
                 <div className='minor__content'>
                    <img className='minor__image' src='https://cdn.iconscout.com/icon/free/png-256/avatar-367-456319.png' alt='avatar'/>
                    <h3 className='minor__name'>
                       voldi muyumba
                    </h3>
                 </div>
            </div>
}

export default MinorRoom