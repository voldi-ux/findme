import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import TextInputComponent from "../../components/form_inputs_components/text";
import { useHistory } from "react-router-dom";
import Radio from "../../components/form_inputs_components/radio";
import Select from "../../components/form_inputs_components/select";
import "./create_profile.scss";
import Button from "../../components/buttons/button";
import { uptdateUserProfileSucceced } from "../../redux/user/user_action";
import {io} from 'socket.io-client'
import { provinces,ObjectCities} from '../../utils/citiesAndprovinces'

const URI_STRING = process.env.NODE_ENV === 'production'? 'http://localhost:5005/' : "http://localhost:5000/";
let socket;

const CreateProfilePage = ({ match, userId, updateProfile }) => {
  useEffect(() => {
    socket = io.apply(URI_STRING)
    socket.emit('user room', userId)
    socket.on('profile created', profile => {
        updateProfile(profile)
    })
   return () => {
    socket.disconnect()   
    socket.off()
}
  },[userId])

  const history = useHistory();
  const uri = "data:image/png;base64,";
  const [profile, setProfile] = useState({
    UserProfile: {
      name: "",
      surname: "",
      gender: "",
      province:'',
      city: "",
      bio: "please write your bio",
      phone: "",
      title:'',
      userId,
    },
  });
  const cities = ObjectCities[profile.UserProfile.province] || ['select a province first']

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile({
      ...profile,
      UserProfile: {
        ...profile.UserProfile,
        [name]: value,
      },
    });
  };
  const onImageChange = async (event) => {
    let imageUrl = [];
    if (event.target.files && event.target.files[0]) {
      let files = event.target.files;
      const photoUrl = await Object.keys(event.target.files).map(
        async (key, index, arr) => {
          if (key !== "length") {
            //    setProfile({
            //     ...profile,
            //     imagesPreview:[...profile.imagesPreview,URL.createObjectURL(event.target.files[key])]
            // })
            const reader = new FileReader();
            reader.onload = async (data) => {
              let result = data.target.result;
              imageUrl = [...imageUrl, btoa(result).toString("base64")];
              if (arr.length - 1 === index) {
                console.log(imageUrl);
                setProfile({
                  ...profile,
                  UserProfile: {
                    ...profile.UserProfile,
                    gallery: imageUrl,
                  },
                });
              }
            };
            reader.readAsBinaryString(files[key]);

            return imageUrl;
          }
        }
      );
    }
  };

  const onSubmit = (e) => {
    e.preventDefault();
    // if (
    //   profile.UserProfile.name === "" ||
    //   profile.UserProfile.suraName === ""
    // //   profile.UserProfile.age === "" ||
    // //   profile.UserProfile.gender === "" ||
    // //   profile.UserProfile.bio === "" ||
    // //   profile.UserProfile.town === "" ||
    // //   profile.UserProfile.currentLocation === ""
    // )
    //   return false;

    socket.emit('save profile', profile.UserProfile)
  };

  return (
    <div className="updateProfile UserProfile">
      <form
        onSubmit={onSubmit}
        className="form__updateProfile"
        action="/postprofile"
        method="post"
        encType="multipart/form-data"
      >
        <div className="form__group d-flex w-100">
           <img alt='avatar' src='https://dmrmechanical.com/wp-content/uploads/2018/01/avatar-1577909_640.png'/>
           <div className='form__group__buttons'>
           <button type="button" class="btn btn-success">Save</button>
           <button type="button" class="btn btn-warning">Cancel</button>
           </div>
        </div>
        <div className="form__group d-flex w-100">
          <TextInputComponent
            handleChange={handleChange}
            type="text"
            name="name"
            label="name"
            placeholder="name"
          />
          <TextInputComponent
            handleChange={handleChange}
            type="text"
            name="surname"
            label="Surname"
            placeholder="surname"
          />
        </div>
        <div className="form__group d-flex w-100">
          <TextInputComponent
            handleChange={handleChange}
            type="email"
            name="email"
            label="email"
            placeholder="email"
          />
          <TextInputComponent
            handleChange={handleChange}
            type="number"
            name="phone"
            label="Phone"
            placeholder="phone"
          />
        </div>
        <div className="form__group d-flex w-100">
          <TextInputComponent
            handleChange={handleChange}
            type="text"
            name="title"
            label="Job title/occupation"
            placeholder="title"
          />
        </div>

        <div className="form__group d-flex w-100">
          <Select
            options={provinces}
            handleChange={handleChange}
            type="email"
            name="province"
            label="Province"
          />
          <Select
            options={cities}
            handleChange={handleChange}
            type="number"
            name="city"
            label="city"
          />
        </div>

        <div className="form__group mb-4">
          <div className="form__group__radios">
            <h1 className="gender">gender</h1>
            <Radio
              handleChange={handleChange}
              value="male"
              label="male"
              name="gender"
            />
            <Radio
              handleChange={handleChange}
              value="Female"
              label="Female"
              name="gender"
            />
            <Radio
              handleChange={handleChange}
              value="other"
              label="other"
              name="gender"
            />
          </div>
        </div>
        <div className="form__group">
          <div>
            <h1 className="form__group__bio__heading">Your bio*</h1>
            <textarea
              className="form__group__bio__area"
              onChange={handleChange}
              value={profile.UserProfile.bio}
              name="bio"
            />
          </div>
        </div>

        <input type="hidden" name="userId" value={userId} />
        <Button value="SAVE" />
      </form>
    </div>
  );
};

const mapStateToProps = (state) => ({
  userId: state.user.CurrentUser._id,
});
const mapDisptachToProps = (dispatch) => ({
  updateProfile: (profile) => dispatch(uptdateUserProfileSucceced(profile)),
});
export default connect(mapStateToProps, mapDisptachToProps)(CreateProfilePage);
