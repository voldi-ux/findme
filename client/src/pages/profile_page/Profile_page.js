import React from "react"
import {FaMapMarkerAlt,FaMapMarkedAlt,FaFlag} from 'react-icons/fa'
import {IconContext} from 'react-icons'

import './Profile_page.scss'
import Button from "../../components/buttons/button"

const ProfilePage = () => (<div className='profile_page'>

<div className='profile_page__container'>
    <div className='profile_page__details'>
        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQwoXuUePVnEH7Q0FSK1o146m6_SRzMZpqfPsD-PjL-4A&usqp=CAU&ec=45699843" />

     <div  className='profile_page__content'>
         <div className='profile_page__name'>
             Voldi Muyumba (Doa)
         </div>
         <IconContext.Provider value={{size:'1.5rem', className:'profile_page__icons'}}>
           <div className='profile_page__country'>
            <strong> Country :</strong>  <FaFlag /> "USA"
           </div>
           
           <div className='profile_page__location'>
            <strong> Current Location :</strong>  <FaMapMarkedAlt /> "BOSTON"
           </div>
           <div className='profile_page__country'>
             <strong>From :</strong> <FaMapMarkerAlt /> BOSTON
           </div>

         </IconContext.Provider>
         <div className='profile_page__bio'>
               <h1 className='profile_page__bio__heading'>
                   Read to know more me more!!!
               </h1>
               <p>
                                
                In friendship diminution instrument so. Son sure paid door with say them. Two among sir sorry men court. Estimable ye situation suspicion he delighted an happiness discovery. Fact are size cold why had part. If believing or sweetness otherwise in we forfeited. Tolerably an unwilling arranging of determine. Beyond rather sooner so if up wishes or. 

                Woody equal ask saw sir weeks aware decay. Entrance prospect removing we packages strictly is no smallest he. For hopes may chief get hours day rooms. Oh no turned behind polite piqued enough at. Forbade few through inquiry blushes you. Cousin no itself eldest it in dinner latter missed no. Boisterous estimating interested collecting get conviction friendship say boy. Him mrs shy article smiling respect opinion excited. Welcomed humoured rejoiced peculiar to in an. 
               </p>
         </div>
         <Button value='edit profile' />
     </div>
    </div>
    <div className='profile_page__gallary'>
         <h1>
             Photos
         </h1>
        <div className='profile_page__gallary__container '>
             <div className='profile_page__gallary__item'>
                 <img src={require('../../assets/images/image-1.jpg')} alt='image' />
             </div>
             <div className='profile_page__gallary__item'>
                 <img src={require('../../assets/images/image-2.jpg')} alt='image' />
             </div>
             <div className='profile_page__gallary__item'>
                 <img src={require('../../assets/images/image-3.jpg')} alt='image' />
             </div>
             <div className='profile_page__gallary__item'>
                 <img src={require('../../assets/images/image-4.jpg')} alt='image' />
             </div>
             <div className='profile_page__gallary__item'>
                 <img src={require('../../assets/images/image-5.jpg')} alt='image' />
             </div>
        </div>
        <Button value='add image' />
    </div>
</div>
</div>)

export default ProfilePage