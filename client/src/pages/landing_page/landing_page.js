import React from 'react'
import SignInComponent from '../../components/signIn_component/signIn_comoponent'
import './landing_page.scss'
import { Link } from 'react-router-dom'

const LandingPage = ({match}) => {

    if(match.path === '/') {
        return  (<div className='landing_page__container'>
        <div className='landing_page__content'>
            <div className='landing_page__content-1'> 
             <h1 className='landing_page__heading_primary'>
                   WELCOME TO <span className='find'>FIND</span><span className='me'>ME</span>
               </h1>
             <p>
                Start finding people you know
             </p>
             <Link to='/home'>
                <span className='find'>&#8594;  FIND</span><span className='me'>ME</span>
                </Link>
            </div>
   
            <div className='landing_page__content-2'> 
                 <h1 className='landing_page__heading'>
                     SignIn
                 </h1>
               <SignInComponent black = 'true'/>              
            </div>
        </div>
   </div>)
    } else if (match.path === '/verifyemail')  {
        return <h1>
            please very your email 
        </h1>
    }
}

export default LandingPage