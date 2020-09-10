import React from 'react'

import './filter_container.scss'
import SelectComponent from '../form_inputs_components/select'
import RangeComponent from '../form_inputs_components/range'
import Button from '../buttons/button'


const FilterContainer = () => (<form className='filter_container'>
 <div className='filter_group' >
     <h3>Filter by age</h3>
  <RangeComponent />
  </div>
  <div className='filter_group' >
  <h3>Filter by country</h3>
  <SelectComponent />
  </div>
  <div className='filter_group' >
  <h3>Filter by town</h3>
  <SelectComponent />
  </div>
  <Button value='filter'/>
</form>)


export default FilterContainer