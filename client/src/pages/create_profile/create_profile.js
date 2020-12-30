import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import TextInputComponent from "../../components/form_inputs_components/text";
import { useHistory } from "react-router-dom";
import Radio from "../../components/form_inputs_components/radio";
import Select from "../../components/form_inputs_components/select";
import "./create_profile.scss";
import Button from "../../components/buttons/button";
import { uptdateUserProfileSucceced } from "../../redux/user/user_action";
import { io } from "socket.io-client";
import { provinces, ObjectCities } from "../../utils/citiesAndprovinces";
import Drawer from "react-bottom-drawer";

const URI_STRING =
  process.env.NODE_ENV === "production"
    ? "/"
    : "http://localhost:5005/";
let socket;

const CreateProfilePage = ({ match, userId, updateProfile }) => {
  const [defaultImagePath, setImagePath] = useState(
    "/images/avatars/avatar (1).png"
  );
  const [avatars, setAvatars] = useState([]);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const getImages = async () => {
      const resp = await fetch("/getAvatars");
      const images = await resp.json();

      setAvatars(images);
    };
    getImages();
    socket = io.apply(URI_STRING);

    socket.emit("user room", userId);
    socket.on("profile created", (profile) => {
      updateProfile(profile);
    });
    return () => {
      socket.disconnect();
      socket.off();
    };
  }, []);

  const history = useHistory();
  const uri = "data:image/png;base64,";
  const [profile, setProfile] = useState({
    UserProfile: {
      name: "",
      surname: "",
      gender: "",
      province: "",
      city: "",
      bio: "please write your bio",
      phone: "",
      title: "",
      userId,
    },
  });
  const cities = ObjectCities[profile.UserProfile.province] || [
    "select a province first",
  ];

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

    socket.emit("save profile", {
      ...profile.UserProfile,
      avatarUrl: defaultImagePath,
    });
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
          <img alt="avatar" src={defaultImagePath} />
          <div className="form__group__buttons">
            <button
              onClick={() => setVisible(!visible)}
              type="button"
              className="btn btn-success "
            >
              Pick Profile Image
            </button>
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
        <input type="hidden" name="avatarUrl" value={defaultImagePath} />
        <Button value="SAVE" />
      </form>
      <Drawer onClose={() => setVisible(!visible)} isVisible={visible}>
        <div className="avatars__container">
          {avatars.map((avatar) => (
            <img
              onClick={() => {
                setImagePath(`/images${avatar.path}`);
                setVisible(!visible);
              }}
              key={avatar._id}
              src={`/images${avatar.path}`}
              alt="avatar"
            />
          ))}
        </div>
      </Drawer>
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

// import React, { useState, useEffect } from "react";
// import { connect } from "react-redux";
// import TextInputComponent from "../../components/form_inputs_components/text";
// import { useHistory } from "react-router-dom";
// import Radio from "../../components/form_inputs_components/radio";
// import Select from "../../components/form_inputs_components/select";
// import "./create_profile.scss";
// import Button from "../../components/buttons/button";
// import { uptdateUserProfileSucceced } from "../../redux/user/user_action";
// import {io} from 'socket.io-client'
// import { provinces,ObjectCities} from '../../utils/citiesAndprovinces'
// import Drawer from 'react-bottom-drawer'
// const URI_STRING = process.env.NODE_ENV === 'production'? 'http://localhost:5005/' : "http://localhost:5000/";
// let socket;

// const CreateProfilePage = ({ match, userId, updateProfile }) => {
//   const [defaultImagePath,setImagePath] = useState('/images/avatars/avatar (1).png')
//   const [avatars,setAvatars] = useState([])
//   const [visible,setVisible] = useState(false)

//   useEffect(() => {
//     socket = io(URI_STRING)
//     socket.emit('user room', userId)
//     socket.on('profile created', profile => {
//         updateProfile(profile)
//     })
//    return () => {
//     socket.disconnect()
//     socket.off()
// }
//   },[userId])

//   const [profile, setProfile] = useState({
//     UserProfile: {
//       name: "",
//       surname: "",
//       gender: "",
//       province:'',
//       city: "",
//       bio: "please write your bio",
//       phone: "",
//       title:'',
//       userId,
//     },
//   });
//   const cities = ObjectCities[profile.UserProfile.province] || ['select a province first']

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setProfile({
//       ...profile,
//       UserProfile: {
//         ...profile.UserProfile,
//         [name]: value,
//       },
//     });
//   };
//   const onImageChange = async (event) => {
//     let imageUrl = [];
//     if (event.target.files && event.target.files[0]) {
//       let files = event.target.files;
//       const photoUrl = await Object.keys(event.target.files).map(
//         async (key, index, arr) => {
//           if (key !== "length") {
//             //    setProfile({
//             //     ...profile,
//             //     imagesPreview:[...profile.imagesPreview,URL.createObjectURL(event.target.files[key])]
//             // })
//             const reader = new FileReader();
//             reader.onload = async (data) => {
//               let result = data.target.result;
//               imageUrl = [...imageUrl, btoa(result).toString("base64")];
//               if (arr.length - 1 === index) {
//                 console.log(imageUrl);
//                 setProfile({
//                   ...profile,
//                   UserProfile: {
//                     ...profile.UserProfile,
//                     gallery: imageUrl,
//                   },
//                 });
//               }
//             };
//             reader.readAsBinaryString(files[key]);

//             return imageUrl;
//           }
//         }
//       );
//     }
//   };

//   const onSubmit = (e) => {
//     e.preventDefault();
//     // if (
//     //   profile.UserProfile.name === "" ||
//     //   profile.UserProfile.suraName === ""
//     // //   profile.UserProfile.age === "" ||
//     // //   profile.UserProfile.gender === "" ||
//     // //   profile.UserProfile.bio === "" ||
//     // //   profile.UserProfile.town === "" ||
//     // //   profile.UserProfile.currentLocation === ""
//     // )
//     //   return false;

//     socket.emit('save profile', profile.UserProfile)
//   };

//   return (
//     <div className="updateProfile UserProfile">
//       <form
//         onSubmit={onSubmit}
//         className="form__updateProfile"
//         action="/postprofile"
//         method="post"
//         encType="multipart/form-data"
//       >
//         <div className="form__group d-flex w-100">
//            <img onClick={setVisible(!visible)} alt='avatar' src={defaultImagePath}/>
//            <div className='form__group__buttons'>
//            <button type="button" class="btn btn-success">Save</button>
//            <button type="button" class="btn btn-warning">Cancel</button>
//            </div>
//         </div>
//         <div className="form__group d-flex w-100">
//           <TextInputComponent
//             handleChange={handleChange}
//             type="text"
//             name="name"
//             label="name"
//             placeholder="name"
//           />
//           <TextInputComponent
//             handleChange={handleChange}
//             type="text"
//             name="surname"
//             label="Surname"
//             placeholder="surname"
//           />
//         </div>
//         <div className="form__group d-flex w-100">
//           <TextInputComponent
//             handleChange={handleChange}
//             type="email"
//             name="email"
//             label="email"
//             placeholder="email"
//           />
//           <TextInputComponent
//             handleChange={handleChange}
//             type="number"
//             name="phone"
//             label="Phone"
//             placeholder="phone"
//           />
//         </div>
//         <div className="form__group d-flex w-100">
//           <TextInputComponent
//             handleChange={handleChange}
//             type="text"
//             name="title"
//             label="Job title/occupation"
//             placeholder="title"
//           />
//         </div>

//         <div className="form__group d-flex w-100">
//           <Select
//             options={provinces}
//             handleChange={handleChange}
//             type="email"
//             name="province"
//             label="Province"
//           />
//           <Select
//             options={cities}
//             handleChange={handleChange}
//             type="number"
//             name="city"
//             label="city"
//           />
//         </div>

//         <div className="form__group mb-4">
//           <div className="form__group__radios">
//             <h1 className="gender">gender</h1>
//             <Radio
//               handleChange={handleChange}
//               value="male"
//               label="male"
//               name="gender"
//             />
//             <Radio
//               handleChange={handleChange}
//               value="Female"
//               label="Female"
//               name="gender"
//             />
//             <Radio
//               handleChange={handleChange}
//               value="other"
//               label="other"
//               name="gender"
//             />
//           </div>
//         </div>
//         <div className="form__group">
//           <div>
//             <h1 className="form__group__bio__heading">Your bio*</h1>
//             <textarea
//               className="form__group__bio__area"
//               onChange={handleChange}
//               value={profile.UserProfile.bio}
//               name="bio"
//             />
//           </div>
//         </div>

//         <input type="hidden" name="userId" value={userId} />
//         <Button value="SAVE" />
//       </form>
// {/* <Drawer isVisible={visible}>
//   <div className='avatars__container' >
//     {
//       avatars.map(avatar => <img key={avatar._id} src={`/images${avatar.path}`} alt='avatar' />)
//     }
//   </div>
// </Drawer> */}
//     </div>
//   );
// };

// const mapStateToProps = (state) => ({
//   userId: state.user.CurrentUser._id,
// });
// const mapDisptachToProps = (dispatch) => ({
//   updateProfile: (profile) => dispatch(uptdateUserProfileSucceced(profile)),
// });
// export default connect(mapStateToProps, mapDisptachToProps)(CreateProfilePage);
