import React, {useState} from 'react'
import TextInputComponent from '../../components/form_inputs_components/text'
import Radio from '../../components/form_inputs_components/radio'

import './create_profile.scss'
import Button from '../../components/buttons/button'

const CreateProfilePage = ({match}) => {
    const [profile,setProfile] = useState({
        imagesPreview: []
    })

    const  onImageChange = (event) => {
        if (event.target.files && event.target.files[0]) {

         const photoUrl = Object.keys(event.target.files).map(key => {
             if(key !== 'length') {
                return URL.createObjectURL(event.target.files[key])
             }
         } )

         setProfile({
             imagesPreview:photoUrl
         })
     
        }
        }

   return (
       <form >
           <div className='form__group'  enctype="multipart/form-data">
           <TextInputComponent type='text' name='name'label='name' placeholder ='name'/>
           <TextInputComponent type='text' name='surname' label='Surname' placeholder ='name'/>
           </div>
           <div className='form__group'>
           <TextInputComponent type='text' name='country' label='country' placeholder ='country'/>
           <TextInputComponent type='text' name='town' label='town' placeholder ='town'/>
           <TextInputComponent type='text' name='currentLocation' label='current location' placeholder ='Current Location'/>
           </div>
           <div className='form__group'>
           <TextInputComponent type='number' label='age' name='age'  placeholder ='age'/>
             <div className='form__group__radios'>
             <Radio value='male' label='male' name='gender'/>
             <Radio value='Female' label='Female' name='gender'/>
             <Radio value='other' label='other' name='gender'/>
             </div>
           </div>
           <div className='form__group'>
                <h1>
                    Your bio
                </h1>
               <textarea value='please enter your bio' name='bio' />
           </div>
           <div className='form__group'>
              <input type='file'  name='gallaries' multiple onChange={onImageChange}/>
              <div className='form_group__images'>
                {profile.imagesPreview.map(image => <img style={{
                    width:'200px'
                }} key={image} src={image} alt={image} />)}
              </div>
           </div>
           <Button value='SAVE' />
       </form>
   )
}


export default CreateProfilePage