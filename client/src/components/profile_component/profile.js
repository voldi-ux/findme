import React from "react";
import "./profile.scss";
import Button from "../buttons/button";
import { useHistory } from "react-router-dom";

//should recieve the currently loggedIn user

const ProfileComponent = () => {
  const history = useHistory();
  return (
    <div className="profile">
      <div className="profile__image">
        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQwoXuUePVnEH7Q0FSK1o146m6_SRzMZpqfPsD-PjL-4A&usqp=CAU&ec=45699843" />
      </div>
      <div>
        <h3 className="profile__name">Voldi</h3>
      </div>
      <div>
        <span className="profile__online">
          <span className="profile__online__dot"></span>
          <span className="profile__online__text">online</span>
        </span>
      </div>

      <Button value={"Got to profile"} onClick={() => history.push("/profile")} />
    </div>
  );
};
export default ProfileComponent;
