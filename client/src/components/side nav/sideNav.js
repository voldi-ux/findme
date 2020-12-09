import React from "react";
import { BsSearch } from "react-icons/bs";
import { BsHouse } from "react-icons/bs";
import { MdAccountCircle } from "react-icons/md";
import { AiTwotoneMail } from "react-icons/ai";
import { ImLocation } from "react-icons/im";
import { AiOutlinePhone } from "react-icons/ai";
import { MdLocationCity } from "react-icons/md";
import { IconContext } from "react-icons";
import LogOutBtn from "../notification_icons/notification_icons";

import "./sideNav.scss";

const SideNav = () => {
  return (
    <div className="side-nav d-flex ">
      <aside className="side-nav__bar d-flex flex-column">
        <div className="side-nav__icons__container">
          <IconContext.Provider
            value={{ className: "side-nav__icons", size: "2.5rem" }}
          >
            <div className="d-flex flex-column align-items-center side-nav__link ">
              <BsHouse />
              <h4 className="mt-3">HOME</h4>
            </div>
            <div  className="d-flex flex-column align-items-center side-nav__link">
              <MdAccountCircle />
              <h4 className="mt-3">PROFILE</h4>
            </div>
          </IconContext.Provider>
        </div>
        <LogOutBtn />
      </aside>
      <aside className="side-nav__chats">
        <header>
          <h1>Chats</h1>
          <IconContext.Provider
            value={{ className: "side-nav__chats__icon", size: "2rem" }}
          >
            <div className='input-group mb-3 w-100" side-nav__input__container my-4'>
              <input
                type="text"
                class="form-control side-nav__input"
                placeholder="Search for chats"
                aria-label="Recipient's username"
                aria-describedby="basic-addon2"
              />
              <span
                className="input-group-text side-nav__search"
                id="basic-addon2"
              >
                <BsSearch />
              </span>
            </div>
          </IconContext.Provider>
        </header>
        <main>
          <div className="list-group  mb-4">
            <div
              className="list-group-item side-nav__chats__chat list-group-item-action d-flex"
              aria-current="true"
            >
              <img
                alt="..ddd"
                src="https://i.guim.co.uk/img/media/35eeb4f8297b0a0771a8dd6312e71058a3249e4a/0_102_2441_1464/master/2441.jpg?width=1200&height=1200&quality=85&auto=format&fit=crop&s=3960b3510fc62983d7fbe6ba096238b5"
              />
              <div className='ms-3'>
                <div className="d-flex w-100 justify-content-between ">
                  <h5 className="mb-4 side-nav__chats__chat__name">
                    Voldi Muyumba
                  </h5>
                  <small className="side-nav__chats__chat__time">
                    3 days ago
                  </small>
                </div>
                <p className=" side-nav__chats__chat__msg">
                  Donec id elit non mi porta gravida at eget metus. Maecenas sed
                  diam eget risus varius blandit.
                </p>
              </div>
            </div>
          </div>
          <div className="list-group  mb-4">
            <div
              className="list-group-item side-nav__chats__chat list-group-item-action d-flex"
              aria-current="true"
            >
              <img
                alt="..ddd"
                src="https://i.guim.co.uk/img/media/35eeb4f8297b0a0771a8dd6312e71058a3249e4a/0_102_2441_1464/master/2441.jpg?width=1200&height=1200&quality=85&auto=format&fit=crop&s=3960b3510fc62983d7fbe6ba096238b5"
              />
              <div className='ms-3'>
                <div className="d-flex w-100 justify-content-between ">
                  <h5 className="mb-4 side-nav__chats__chat__name">
                    Voldi Muyumba
                  </h5>
                  <small className="side-nav__chats__chat__time">
                    3 days ago
                  </small>
                </div>
                <p className=" side-nav__chats__chat__msg">
                  Donec id elit non mi porta gravida at eget metus. Maecenas sed
                  diam eget risus varius blandit.
                </p>
              </div>
            </div>
          </div>
          <div className="list-group  mb-4">
            <div
              className="list-group-item side-nav__chats__chat list-group-item-action d-flex"
              aria-current="true"
            >
              <img
                alt="..ddd"
                src="https://i.guim.co.uk/img/media/35eeb4f8297b0a0771a8dd6312e71058a3249e4a/0_102_2441_1464/master/2441.jpg?width=1200&height=1200&quality=85&auto=format&fit=crop&s=3960b3510fc62983d7fbe6ba096238b5"
              />
              <div className='ms-3'>
                <div className="d-flex w-100 justify-content-between ">
                  <h5 className="mb-4 side-nav__chats__chat__name">
                    Voldi Muyumba
                  </h5>
                  <small className="side-nav__chats__chat__time">
                    3 days ago
                  </small>
                </div>
                <p className=" side-nav__chats__chat__msg">
                  Donec id elit non mi porta gravida at eget metus. Maecenas sed
                  diam eget risus varius blandit.
                </p>
              </div>
            </div>
          </div>
          <div className="list-group  mb-4">
            <div
              className="list-group-item side-nav__chats__chat list-group-item-action d-flex"
              aria-current="true"
            >
              <img
                alt="..ddd"
                src="https://i.guim.co.uk/img/media/35eeb4f8297b0a0771a8dd6312e71058a3249e4a/0_102_2441_1464/master/2441.jpg?width=1200&height=1200&quality=85&auto=format&fit=crop&s=3960b3510fc62983d7fbe6ba096238b5"
              />
              <div className='ms-3'>
                <div className="d-flex w-100 justify-content-between ">
                  <h5 className="mb-4 side-nav__chats__chat__name">
                    Voldi Muyumba
                  </h5>
                  <small className="side-nav__chats__chat__time">
                    3 days ago
                  </small>
                </div>
                <p className=" side-nav__chats__chat__msg">
                  Donec id elit non mi porta gravida at eget metus. Maecenas sed
                  diam eget risus varius blandit.
                </p>
              </div>
            </div>
          </div>
        </main>
      </aside>
    </div>
  );
};

export default SideNav;
