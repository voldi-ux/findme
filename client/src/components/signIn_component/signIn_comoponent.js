import React,{useState} from 'react'
import './signIn_comoponent.scss'
import TextInputComponent from '../form_inputs_components/text'
import Button from '../buttons/button'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { loggingInUser } from '../../redux/user/user_action'


  
const SignInComponent = ({black,startLogging}) => {
const [userInputs, setUserInput] = useState({
  email:'',
  password:''
})
  const onSubmit = (e) => {
    e.preventDefault()
      startLogging(userInputs)
  }
  const handleChange = (e) => {
    const {name,value} = e.target
    setUserInput({...userInputs, [name]: value})
  }
    return (<div className={`form__signIn ${black ? 'black':''}`}>
       {black ? null : <h1 className='form__signIn__heading'>SignIn</h1>}
        <form onSubmit={onSubmit} className='form '>
          <TextInputComponent handleChange={handleChange} name='email' placeholder='email' type='email' />
          <TextInputComponent handleChange={handleChange} name='password' placeholder='password' type='password' />
          <Button value='SignIn'/>
        </form>
        <p>
          do not have an account ? <Link to='/signup' >Signup</Link>
        </p>
        </div>
    )
}
const mapDispatchTprops = (dispatch) => ({
  startLogging: data => dispatch(loggingInUser(data))
})
export default connect(null,mapDispatchTprops)( SignInComponent)