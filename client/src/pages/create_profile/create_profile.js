import React, {useState} from 'react';
import { connect} from 'react-redux'
import TextInputComponent from '../../components/form_inputs_components/text'
import {useHistory } from 'react-router-dom'
import Radio from '../../components/form_inputs_components/radio'

import './create_profile.scss'
import Button from '../../components/buttons/button'
import { onUserProfileUpdate } from '../../redux/user/user_action';

const CreateProfilePage = ({match,userId, updateProfile}) => {
    const history = useHistory()
    const uri = 'data:image/png;base64,'
    const [profile,setProfile] = useState({
        UserProfile: {
            name:'',
            surName:'',
            gender:'',
            age:'',
            country:'',
            town:'',
            bio:'please write your bio',
            currentLocation:'',
            gallery: [],
            userId,
        },
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
    const  onImageChange = async(event) => {
        let imageUrl= []
        if (event.target.files && event.target.files[0]) {
      let files = event.target.files
         const photoUrl = await Object.keys(event.target.files).map(async (key,index,arr) => {
             if(key !== 'length') {
                //    setProfile({
                //     ...profile,
                //     imagesPreview:[...profile.imagesPreview,URL.createObjectURL(event.target.files[key])]
                // })        
                const reader = new FileReader()
                reader.onload = async(data) => {
                   let result =  data.target.result
                   imageUrl = [...imageUrl, btoa(result).toString('base64')]
                   if(arr.length - 1 === index) {
                       console.log(imageUrl)
                       setProfile({
                        ...profile,
                         UserProfile:{
                             ...profile.UserProfile,
                             gallery:imageUrl
                         }
                    })
                    
                       
                   }
                }
                reader.readAsBinaryString(files[key]) 
               
                return  imageUrl
             }
         } )

            
         
     
        }
        }

        const onSubmit = (e) => {
            e.preventDefault()
            if(profile.UserProfile.name === '' || 
            profile.UserProfile.suraName === '' ||
            profile.UserProfile.age === '' ||
            profile.UserProfile.gender=== '' ||
            profile.UserProfile.bio === '' ||
            profile.UserProfile.gallery.length <= 0 ||
            profile.UserProfile.town === '' ||
            profile.UserProfile.country === '' ||
            profile.UserProfile.currentLocation === ''  ) return false

            updateProfile(profile.UserProfile)
            history.push('/home')
        }

   return (
      <div className='updateProfile UserProfile'>
           <form onSubmit={onSubmit} className='form__updateProfile' action='/postprofile' method='post' encType="multipart/form-data">
           <div className='form__group'>
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
               <input type='file' accept='iamge/*' name='gallaries' multiple onChange={onImageChange}/>
             
           </div>
           <div className='form__group__images'>
                {profile.UserProfile.gallery.map(image => <img className='form__group__images__preview' src={uri + image} alt={uri} />)}
              </div>
              <input type='hidden' name='userId' value={userId} />
           <Button value='SAVE' />
           {console.log(profile)}
       </form>
      </div>
   )
}

const mapStateToProps = (state) => ({
 userId: state.user.CurrentUser._id 
})
const mapDisptachToProps = (dispatch) => ({
 updateProfile: (profile) => dispatch(onUserProfileUpdate(profile))
})
export default connect(mapStateToProps, mapDisptachToProps)(CreateProfilePage)