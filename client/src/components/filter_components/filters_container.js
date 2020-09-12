import React,{useState} from 'react'
import { connect } from 'react-redux'


import './filter_container.scss'
import SelectComponent from '../form_inputs_components/select'
import RangeComponent from '../form_inputs_components/range'
import Button from '../buttons/button'
import Radio from '../form_inputs_components/radio'
import { filterData } from '../../redux/app_data_reducer/data_actions'


const FilterContainer = ({filter}) => {
  const [filterData,setFilterData] = useState({
    age:'',
    country:'',
    town:'',
    gender:''
  })

  const onSubmit = (e) => {
    e.preventDefault()
    if(filterData.age === '' && filterData.country ==' '&& filterData.gender == '' &&  filterData.town === '') {
      return false;
    }
    filter(filterData)
  }

  const handleChange = (event) => {
    const {name,value} = event.target;
    setFilterData({
    ...filterData, [name]: value
    })

  }
  const countries = ['select country','USA', 'canada', 'SA', 'DRC' ]
  const towns = ['select town','JHB', 'BOSTON', 'Durban', 'NY']
  return (<form onSubmit={onSubmit} className='filter_container'>
  <div className='filter_group' >
      <h3>Filter by age</h3>
   <RangeComponent name='age' handleChange={handleChange}/>
{filterData.age ? <h3>age:  {filterData.age} </h3> : null}
   </div>
   <div className='filter_group' >
   <h3>Filter by country</h3>
   <SelectComponent name='country' options={countries} handleChange={handleChange}/>
   </div>
   <div className='filter_group' >
   <h3>Filter by town</h3>
   <SelectComponent name='town' options={towns} handleChange={handleChange}/>
   </div>
   <div className='filter_group'>
     <h3>
       Filter by gender
     </h3>
     <Radio handleChange={handleChange}  label='male' name='gender' checked={filterData.gender === 'male'} value='male'/>
     <Radio  handleChange={handleChange}  label='female' name='gender' value='Female'checked={filterData.gender === 'female'}/>
     <Radio handleChange={handleChange}   label='other' name='gender' value='other' checked={filterData.gender === 'other'}/>
   </div>
   <Button value='Filter'/>
 </form>)
 
}
const mapDispatchToProps = dispacth => ({
  filter: data => dispacth(filterData(data))
})
export default connect(null,mapDispatchToProps)(FilterContainer)