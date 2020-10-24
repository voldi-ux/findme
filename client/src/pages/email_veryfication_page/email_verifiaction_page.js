import React from 'react'
import SignInComponent from '../../components/signIn_component/signIn_comoponent'
import './verification.scss'
import { Link } from 'react-router-dom'

const VeryEmailPage = ({match}) => (<div className='Veri-landing_page__container'>
           
           <p>
               A verification email has been sent to your email box.
               please open up your mail-box and very your email adress.
           </p>
    
</div>)

export default VeryEmailPage