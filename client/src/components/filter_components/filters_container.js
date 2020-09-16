import React,{useState,useContext} from 'react'
import { connect } from 'react-redux'


import './filter_container.scss'
import SelectComponent from '../form_inputs_components/select'
import RangeComponent from '../form_inputs_components/range'
import Button from '../buttons/button'
import Radio from '../form_inputs_components/radio'
import { filterData, onFechingFilterProfiles } from '../../redux/app_data_reducer/data_actions'
import { FilterProfileContext } from '../../context/filter_Data_context/filter.data'


const FilterContainer = ({onfilter}) => {
  const context = useContext(FilterProfileContext)
  const {filterData} = useContext(FilterProfileContext)
  console.log(context)
 
  const onSubmit = (e) => {
    e.preventDefault()
    if(context.age === '' && context.country ==' '&& context.gender == '' &&  filterData.town === '') {
      return false;
    }
     context.clearState()
    const {age,
      gender,
      country,
      town,
      pageNum
      } = context
    onfilter(1,filterData)
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
  return (<form onSubmit={onSubmit} className='filter_container'>
  <div className='filter_group' >
      <h3>Filter by age</h3>
   <RangeComponent  name='age' value={filterData.age} handleChange={handleChange}/>
{filterData.age ? <h3>age:  {filterData.age} </h3> : null}
   </div>
   <div className='filter_group' >
   <h3>Filter by country</h3>
   <SelectComponent value={filterData.country} name='country' options={countries} handleChange={handleChange}/>
   </div>
   <div className='filter_group' >
   <h3>Filter by town</h3>
   <SelectComponent value={filterData.town} name='town' options={towns} handleChange={handleChange}/>
   </div>
   <div className='filter_group'>
     <h3>
       Filter by gender
     </h3>
     <Radio handleChange={handleChange}  label='male' name='gender' checked={context.gender === 'male'} value='male'/>
     <Radio  handleChange={handleChange}  label='female' name='gender' value='Female'checked={context.gender === 'female'}/>
     <Radio handleChange={handleChange}   label='other' name='gender' value='other' checked={context.gender === 'other'}/>
   </div>
   <Button value='Filter'/>
 </form>)
 
}
const mapDispatchToProps = dispacth => ({
  onfilter: (pageNo,data) => dispacth(onFechingFilterProfiles(pageNo,data))
})
export default connect(null,mapDispatchToProps)(FilterContainer)