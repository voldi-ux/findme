import React from 'react'
import SignInComponent from '../../components/signIn_component/signIn_comoponent'
import './landing_page.scss'
import { Link } from 'react-router-dom'

const LandingPage = ({match}) => {

    if(match.path === '/') {
        return  (<div className='landing_page__container'>
            <img src='http://localhost:5005/images/background-image-1.png' alt='back image'/>

        <div className='landing_page__content'>
            <div className='landing_page__content-1'> 
             
            </div>
   
            <div className='landing_page__content-2'> 
                 <h1 className='landing_page__heading'>
                     SIGN IN
                 </h1>
               <SignInComponent/>              
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