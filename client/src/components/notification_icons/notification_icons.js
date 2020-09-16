import React from 'react'
import { ImBubble2 } from 'react-icons/im'
import {FaBell} from 'react-icons/fa'
import {IconContext} from 'react-icons'


import './notification_icons.scss'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { logOut } from '../../redux/user/user_action'

const NotificationContainer = ({isLoggedin,logout}) => (<div className='notification__container'>
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
       {isLoggedin ? <span className='notification__login' onClick={logout}>
          signOut
       </span> : <Link to='/signin' className='notification__login'>
        signin
     </Link>}
</div>)

const mapStateToProps = state => ({
   isLoggedin: state.user.loggedIn
})
const mapDispatchToProps = dispacth => ({
   logout: () => dispacth(logOut())
 })
export default connect(mapStateToProps,mapDispatchToProps)(NotificationContainer)