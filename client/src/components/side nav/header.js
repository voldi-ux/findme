import React from 'react'
import { BsHouse } from "react-icons/bs";
import { IconContext } from "react-icons";
import { useHistory } from "react-router-dom";
import { MdAccountCircle } from "react-icons/md";
import LogOutBtn from "../notification_icons/notification_icons";
import './sideNav.scss'


const Header = () => {
  const history = useHistory();

    return <aside className="side-nav__bar d-flex flex-column">
    <div className="side-nav__icons__container">
      <IconContext.Provider
        value={{ className: "side-nav__icons", size: "2.5rem" }}
      >
        <div className="d-flex flex-column align-items-center side-nav__link ">
          <BsHouse onClick={() => history.push("/home")} />
          <h4 className="mt-3">HOME</h4>
        </div>
        <div className="d-flex flex-column align-items-center side-nav__link">
          <MdAccountCircle
            onClick={() => history.push("/profile?current=true")}
          />
          <h4 className="mt-3">PROFILE</h4>
        </div>
      </IconContext.Provider>
    </div>
    <LogOutBtn />
  </aside>
}

export default Header;