import React,{useState,useContext} from 'react'
import { connect } from 'react-redux'
import {useHistory} from 'react-router-dom'

import './filter_container.scss'
import SelectComponent from '../../../components/form_inputs_components/select'
import Button from '../../../components/buttons/button'
import Radio from '../../../components/form_inputs_components/radio'
import { filterData, onFechingFilterProfiles } from '../../../redux/app_data_reducer/data_actions'
import { FilterProfileContext } from '../../../context/filter_Data_context/filter.data'
import TextInputComponent from '../../../components/form_inputs_components/text'


const FilterContainerResp = ({onfilter, showNav}) => {
  const context = useContext(FilterProfileContext)
  const {filterData} = useContext(FilterProfileContext)
  const history = useHistory() 
  const onSubmit = (e) => {
    e.preventDefault()
    if(filterData.name === '' || filterData.country ==='select country'|| filterData.gender === '' ||  filterData.town === 'select town') {
      return false;
    }
    history.push('/home/advance-search')
    onfilter(filterData)
    //  context.clearState()
    // filter(filterData)
  }

  const handleChange = (event) => {
    const {name,value} = event.target;
     context.setState({
       [name] : value
     })
  }
  const countries = ['select country','USA', 'canada', 'SA', 'DRC' ]
  const towns = ['select town','JHB', 'BOSTON', 'Durban', 'NY']
  return (<form onSubmit={onSubmit}  className={`Resp-filter_container  ${showNav ? 'slide-left' :null}`}>
       <div className='Resp-filter_inner_container'>
       <h3>Advance Search</h3>
  <div className='filter_group' >
      <TextInputComponent placeholder='Search' name='name' value={filterData.name} handleChange={handleChange}/>
   </div>
   <div className='filter_group' >
   <h3> country</h3>
   <SelectComponent value={filterData.country} name='country' options={countries} handleChange={handleChange}/>
   </div>
   <div className='filter_group' >
   <h3> town</h3>
   <SelectComponent value={filterData.town} name='town' options={towns} handleChange={handleChange}/>
   </div>
   <div className='filter_group'>
     <h3>
        gender
     </h3>
     <Radio handleChange={handleChange}  label='male' name='gender' checked={context.gender === 'male'} value='male'/>
     <Radio  handleChange={handleChange}  label='female' name='gender' value='Female'checked={context.gender === 'female'}/>
     <Radio handleChange={handleChange}   label='other' name='gender' value='other' checked={context.gender === 'other'}/>
   </div>
   <Button value='Search' onClick={() => {
  
   }}/>
       </div>
    
 </form>)
 
}
const mapDispatchToProps = dispacth => ({
  onfilter: (data) => dispacth(onFechingFilterProfiles(data))
})
const mapStateToProps = ({user}) => ({
  showNav:user.LeftNavVisible
})
export default connect(mapStateToProps,mapDispatchToProps)(FilterContainerResp)