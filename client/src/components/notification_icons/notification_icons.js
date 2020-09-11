import React from 'react'
import { ImBubble2 } from 'react-icons/im'
import {FaBell} from 'react-icons/fa'
import {IconContext} from 'react-icons'


import './notification_icons.scss'
import { Link } from 'react-router-dom'

const NotificationContainer = () => (<div className='notification__container'>
    <span className='notification__icons' >
       <IconContext.Provider value={{className:'notification__icon',size:'2rem'}} >
        <span className=' notification__icon__container'>
           <ImBubble2 />
           <span className='notification__icon__count'>
                5
           </span>
           </span>
        <span className=' notification__icon__container'>
             <FaBell />
             <span className='notification__icon__count'>
                50
           </span>
           </span>
       </IconContext.Provider>
       
       </span>
     <Link to='/signin' className='notification__login'>
        signin
     </Link>
</div>)


export default NotificationContainer