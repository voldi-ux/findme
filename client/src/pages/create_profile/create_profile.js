import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import TextInputComponent from "../../components/form_inputs_components/text";
import Radio from "../../components/form_inputs_components/radio";
import Select from "../../components/form_inputs_components/select";
import "./create_profile.scss";
import Button from "../../components/buttons/button";
import { uptdateUserProfileSucceced } from "../../redux/user/user_action";
import { io } from "socket.io-client";
import { provinces, ObjectCities } from "../../utils/citiesAndprovinces";
import Drawer from "react-bottom-drawer";
import Alert from "../../components/alert/alert";

const URI_STRING =
  process.env.NODE_ENV === "production" ? "/" : "http://localhost:5005/";
let socket;

const CreateProfilePage = ({  userId, updateProfile }) => {
  const [defaultImagePath, setImagePath] = useState(
    "/images/avatars/avatar (1).png"
  );
  const [avatars, setAvatars] = useState([]);
  const [visible, setVisible] = useState(false);
  const [err, setError] = useState(false);
  const [errMsg, setErrMsg] = useState("");
  useEffect(() => {
    if (err || errMsg.length) {
      setTimeout(() => {
        setErrMsg("");
        setError(false);
      }, 5000);
    }
  }, [err, errMsg]);

  useEffect(() => {
    const getImages = async () => {
      try{
        const resp = await fetch(`${URI_STRING}getAvatars`);
      const images = await resp.json();

      setAvatars(images);
      } catch(error) {
        // alert(error.message)
      }
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
  }, [updateProfile,userId]);

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
  // const onImageChange = async (event) => {
  //   let imageUrl = [];
  //   if (event.target.files && event.target.files[0]) {
  //     let files = event.target.files;
  //     const photoUrl = await Object.keys(event.target.files).map(
  //       async (key, index, arr) => {
  //         if (key !== "length") {
  //           //    setProfile({
  //           //     ...profile,
  //           //     imagesPreview:[...profile.imagesPreview,URL.createObjectURL(event.target.files[key])]
  //           // })
  //           const reader = new FileReader();
  //           reader.onload = async (data) => {
  //             let result = data.target.result;
  //             imageUrl = [...imageUrl, btoa(result).toString("base64")];
  //             if (arr.length - 1 === index) {
  //               console.log(imageUrl);
  //               setProfile({
  //                 ...profile,
  //                 UserProfile: {
  //                   ...profile.UserProfile,
  //                   gallery: imageUrl,
  //                 },
  //               });
  //             }
  //           };
  //           reader.readAsBinaryString(files[key]);

  //           return imageUrl;
  //         }
  //       }
  //     );
  //   }
  // };

  const onSubmit = (e) => {
    e.preventDefault();
    if (
      profile.UserProfile.name === "" ||
      profile.UserProfile.suraName === "" ||
      profile.UserProfile.title === "" ||
      profile.UserProfile.gender === "" ||
      profile.UserProfile.bio === "please write your bio" ||
      profile.UserProfile.province === "" ||
      profile.UserProfile.city === ""
    ) {
      setErrMsg("all fields must be filled");
      setError(true);
      return false;
    }

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
              Pick a Profile Image
            </button>
          </div>
        </div>
        {err || errMsg.length ? (
          <Alert message={errMsg} type="alert-danger" />
        ) : null}

        <div className="form__group d-flex w-100">
          <TextInputComponent
            err={err}
            handleChange={handleChange}
            type="text"
            name="name"
            label="name"
            placeholder="name"
            id='dfgggg'
          />
          <TextInputComponent
          id='sdfsdfs'
            err={err}
            handleChange={handleChange}
            type="text"
            name="surname"
            label="Surname"
            placeholder="surname"
          />
        </div>
        <div className="form__group d-flex w-100">
          <TextInputComponent
          id='dfdkfj'
            err={err}
            handleChange={handleChange}
            type="email"
            name="email"
            label="email"
            placeholder="email"
          />
          <TextInputComponent
          id='dkdkd'
            err={err}
            handleChange={handleChange}
            type="number"
            name="phone"
            label="Phone"
            placeholder="phone"
          />
        </div>
        <div className="form__group d-flex w-100">
          <TextInputComponent
            err={err}
            id='dfjdfj'
            handleChange={handleChange}
            type="text"
            name="title"
            label="Job title/occupation"
            placeholder="title"
          />
        </div>

        <div className="form__group d-flex w-100">
          <Select
            err={err}
            options={provinces}
            handleChange={handleChange}
            type="email"
            name="province"
            label="Province"
          />
          <Select
            err={err}
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
              label="Male"
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
              label="Other"
              name="gender"
            />
          </div>
        </div>
        <div className="form__group">
          <div>
            <h1 className="form__group__bio__heading">Your bio*</h1>
            <textarea
            
              className="form__group__bio__area"
              className={`form__group__bio__area ${err ? "error" : null}`}
              onChange={handleChange}
              value={profile.UserProfile.bio}
              name="bio"
            />
          </div>
        </div>

        <input type="hidden" name="userId" value={userId} />
        <input type="hidden" name="avatarUrl" value={defaultImagePath} />
        <Button value="SAVE" onClick={onSubmit}/>
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
