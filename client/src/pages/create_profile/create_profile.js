import React, {useState} from 'react';
import { connect} from 'react-redux'
import TextInputComponent from '../../components/form_inputs_components/text'
import Radio from '../../components/form_inputs_components/radio'

import './create_profile.scss'
import Button from '../../components/buttons/button'

const CreateProfilePage = ({match,userId}) => {
    const [profile,setProfile] = useState({
        UserProfile: {
            name:'',
            surname:'',
            gender:'',
            age:'',
            country:'',
            town:'',
            bio:'please write your bio',
            currentLocation:'',
        },
        imagesPreview: []
    })
    const handleChange= (e) => {
    const {name,value} = e.target
    setProfile({
       ...profile, 
       UserProfile: {
           ...profile.UserProfile,
           [name]: value
       }
    })
    }
    const  onImageChange = (event) => {
        if (event.target.files && event.target.files[0]) {

         const photoUrl = Object.keys(event.target.files).map(key => {
             if(key !== 'length') {
                return URL.createObjectURL(event.target.files[key])
             }
         } )

         setProfile({
             ...profile,
             imagesPreview:photoUrl
         })
     
        }
        }

   return (
      <div className='updateProfile'>
           <form className='form__updateProfile' action='/postprofile' method='post' encType="multipart/form-data">
           <div className='form__group'  >
           <TextInputComponent handleChange={handleChange} type='text' name='name'label='name' placeholder ='name'/>
           <TextInputComponent handleChange={handleChange} type='text' name='surname' label='Surname' placeholder ='surname'/>
           </div>
           <div className='form__group'>
           <TextInputComponent handleChange={handleChange} type='text' name='country' label='country' placeholder ='country'/>
           <TextInputComponent handleChange={handleChange} type='text' name='town' label='town' placeholder ='town'/>
           <TextInputComponent handleChange={handleChange} type='text' name='currentLocation' label='current location' placeholder ='Current Location'/>
           </div>
           <div className='form__group'>
           <TextInputComponent handleChange={handleChange} type='number' label='age' name='age'  placeholder ='age'/>
             <div className='form__group__radios'>
                 <h1 className='gender'>
                     gender
                 </h1>
             <Radio handleChange={handleChange} value='male' label='male' name='gender'/>
             <Radio handleChange={handleChange} value='Female' label='Female' name='gender'/>
             <Radio handleChange={handleChange} value='other' label='other' name='gender'/>
             </div>
           </div>
           <div className='form__group'>
                <div>
                <h1 className='form__group__bio__heading'>
                    Your bio
                </h1>
               <textarea className='form__group__bio__area' onChange={handleChange} value={profile.UserProfile.bio} name='bio' />
                </div>
           </div>
           <div className='form__group'>
               <input type='file'  name='gallaries' multiple onChange={onImageChange}/>
             
           </div>
           <div className='form__group__images'>
                {profile.imagesPreview.map(image => <img className='form__group__images__preview' key={image} src={image} alt={image} />)}
              </div>
              <input type='hidden' name='userId' value={userId} />
           <Button value='SAVE' />
       </form>
      </div>
   )
}

const mapStateToProps = (state) => ({
 userId: state.user.CurrentUser._id 
})
export default connect(mapStateToProps)(CreateProfilePage)