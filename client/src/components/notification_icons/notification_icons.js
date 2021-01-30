import React from "react";
import { AiOutlineLogout } from "react-icons/ai";
import { IconContext } from "react-icons";
import { useHistory } from "react-router-dom";

import "./notification_icons.scss";
import { connect } from "react-redux";
import { logOut, ToggleSlideInRight } from "../../redux/user/user_action";

const NotificationContainer = ({
  logout,
  
}) => {
  const history = useHistory();

  return (
    <div className="notification__container">
      <span className="notification__icons" onClick={logout}>
        <IconContext.Provider
          value={{ className: "notification__icon", size: "2.5rem" }}
        >
          <span
            className=" notification__icon__container"
            onClick={() => history.push("/chatroom")}
          >
            <AiOutlineLogout />
          </span>
          <span className="notification__login">LogOut</span>
        </IconContext.Provider>
      </span>
    </div>
  );
};

const mapStateToProps = (state) => ({
  isLoggedin: state.user.loggedIn,
  currentUserPhoto:
    state.user.CurrentUser.avatarUrl ||
    "https://dmrmechanical.com/wp-content/uploads/2018/01/avatar-1577909_640.png",
});
const mapDispatchToProps = (dispacth) => ({
  logout: () => dispacth(logOut()),
  toggleNav: () => dispacth(ToggleSlideInRight()),
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NotificationContainer);
