import React,{useState} from 'react';
import { connect } from 'react-redux'
import {useHistory} from 'react-router-dom'
import {ImSearch} from 'react-icons/im'
import {IconContext} from 'react-icons'
import './search_bar.scss'
import { onFechingFilterProfiles } from '../../redux/app_data_reducer/data_actions';


const SeacrhBar = ({onSearch}) => {
   const history = useHistory()
   const [formInput,setFormInput]  = useState({
      searchQuery: ''
   })
   const onSubmit = (e) => {
    e.preventDefault()
    if(formInput ==='') return false;
    history.push('/home')
      const name = formInput.searchQuery.split(' ')[0]
      const surname = formInput.searchQuery.split(' ')[1]
      onSearch({
            name,
            surname
      })
   }
   const handleChange = (e) => {
      const {value,name} = e.target;
      setFormInput({...formInput, searchQuery: value})
   }
   return (<div className='search_bar__container'>
   <form onSubmit={onSubmit}>
      <input type='text' onChange={handleChange} name='searchQuery'  className='search_bar__input' placeholder='seacrh...' />  
   </form>
<IconContext.Provider value={{size:'2rem', className:'search_bar__icon' }}>
   <ImSearch />
</IconContext.Provider>

</div>)
}

const mapDispatchToProps = dispacth => ({
   onSearch: (data) => dispacth(onFechingFilterProfiles(data))
 })
export default connect(null,mapDispatchToProps)(SeacrhBar)