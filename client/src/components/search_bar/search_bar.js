import React from 'react';
import {ImSearch} from 'react-icons/im'
import {IconContext} from 'react-icons'
import './search_bar.scss'


const SeacrhBar = () => (<div className='search_bar__container'>
     <input type='text' className='search_bar__input' placeholder='seacrh...' />
  <IconContext.Provider value={{size:'2rem', className:'search_bar__icon' }}>
     <ImSearch />
  </IconContext.Provider>

</div>)


export default SeacrhBar