import React , {useState}from 'react'
import './signUp_comoponent.scss'
import TextInputComponent from '../form_inputs_components/text'
import Button from '../buttons/button'
import { Link ,withRouter } from 'react-router-dom'

const SignUpComponent = ({match,location}) => {
  let endpiont;
  if(match.path === '/signup') {
    endpiont = 'signingup'
  } else if(match.path === '/getcredentials') {
    endpiont = 'credentials'
  }

 const[siginUpdata, setSignUpdata] = useState({
   name:'',
   email:''
 })

 const onSubmit =async (event) => {
  //  event.preventDefault()
   if(siginUpdata.name == '' || siginUpdata.email == '') return false;
  //  const resp = await fetch(`/${endpiont}`, {
  //    method:'post',
  //    headers: {
  //      'Content-Type': 'application/json'
  //    },
  //    body: JSON.stringify(siginUpdata)
  //  })
  //  const data = await resp.json()
  //  console.log(data)
 }
 const handleChange = (e) => {
   const {name,value} = e.target; 
   setSignUpdata({
     ...siginUpdata,
     [name] : value
   })
 }
    if(match.path === '/signup') {
      
   return   (<div className='form__signUp'>
        <h1 className='form__signUp__heading'>SignUp</h1>
        <form action='/signingup' method='post' onSubmit={onSubmit} className='form '>
          <TextInputComponent type='text' handleChange={handleChange} placeholder='name' type='text' name='name'/>
          <TextInputComponent type='email'handleChange={handleChange} placeholder='email' type='email' name='email' />
          <Button value='SignUp'/>
        </form>
        <p>
          already have an account ? <Link to='/signin' >Signin</Link>
        </p>
        </div>
    )
    } else if(match.path === '/getcredentials') {
   
      return (<div className='form__signUp'>
      <h1 className='form__signUp__heading' >create password</h1>
      <form action='/credentials' method='post' onSubmit={onSubmit} className='form '>
        <TextInputComponent type='password' handleChange={handleChange} placeholder='password'  name='password'/>
        <TextInputComponent type='password'handleChange={handleChange} placeholder='confirPassword'  name='confirmPassword' />
        <TextInputComponent type='hidden' value={location.search} handleChange={handleChange} placeholder='confirPassword'  name='hidden' />
        <Button value='create password'/>
      </form>
      <p>
        already have an account ? <Link to='/signin' >Signin</Link>
      </p>
      </div>
  )

    }
}

export default withRouter(SignUpComponent)