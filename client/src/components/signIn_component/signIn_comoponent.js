import React from 'react'
import './signIn_comoponent.scss'
import TextInputComponent from '../form_inputs_components/text'
import Button from '../buttons/button'
import { Link } from 'react-router-dom'
const SignInComponent = ({black}) => {

    return (<div className={`form__signIn ${black ? 'black':''}`}>
       {black ? null : <h1 className='form__signIn__heading'>SignIn</h1>}
        <form className='form '>
          <TextInputComponent placeholder='email' type='email' />
          <TextInputComponent placeholder='password' type='password' />
          <Button value='SignIn'/>
        </form>
        <p>
          do not have an account ? <Link to='/signup' >Signup</Link>
        </p>
        </div>
    )
}

export default SignInComponent