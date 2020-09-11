import React from 'react'
import './navigation_bar.scss'

import SeacrhBar from '../search_bar/search_bar'
import NotificationContainer from '../notification_icons/notification_icons'
import { Link } from 'react-router-dom'
const NavigationBar = ()=> {

    return <nav className='navigation_bar'>
           <span className='navigation_bar__logo_container'>
              <Link to='/' className='navigation_bar__logo' >
              Find<span>me</span>
              </Link>
           </span>
        
              <SeacrhBar className='navigation_bar__search_bar' />
           
           <NotificationContainer className='navigation_bar__icons' />
               
          
    </nav>
}

export default NavigationBar