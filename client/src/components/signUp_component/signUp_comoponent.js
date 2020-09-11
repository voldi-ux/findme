import React from 'react'
import './signUp_comoponent.scss'
import TextInputComponent from '../form_inputs_components/text'
import Button from '../buttons/button'
import { Link } from 'react-router-dom'
const SignUpComponent = () => {

    return (<div className='form__signUp'>
        <h1 className='form__signUp__heading'>SignUp</h1>
        <form className='form '>
          <TextInputComponent placeholder='name' type='text' />
          <TextInputComponent placeholder='email' type='email' />
          <Button value='SignUp'/>
        </form>
        <p>
          already have an account ? <Link to='/signin' >Signin</Link>
        </p>
        </div>
    )
}

export default SignUpComponent