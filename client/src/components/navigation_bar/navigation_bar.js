import React from 'react'
import './navigation_bar.scss'

import SeacrhBar from '../search_bar/search_bar'
import NotificationContainer from '../notification_icons/notification_icons'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { toggleProfileComponent } from '../../redux/controls/actions'
const NavigationBar = ({toggleProfileComponent})=> {

    return <nav className='navigation_bar'>
           <span className='navigation_bar__logo_container'>
              <Link to='/' className='navigation_bar__logo' >
                <img  src={require
               ('../../assets/images/logo.png')}/>
              </Link>
              <span className='navigation_bar__bar navigation_bar__logo bar' onClick={toggleProfileComponent}>
                 &#9776;
              </span>
           </span>
        
              <SeacrhBar className='navigation_bar__search_bar' />
           
           <NotificationContainer className='navigation_bar__icons' />
               
          
    </nav>
}

const mapDispatch = (dispatch) => ({
   toggleProfileComponent: () => dispatch(toggleProfileComponent())
 });
 
export default connect(null, mapDispatch)(NavigationBar)