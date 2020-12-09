import React from "react";
import { IconContext } from "react-icons";
import { BsThreeDotsVertical } from "react-icons/bs";
import { FiPaperclip } from "react-icons/fi";
import { FaPaperPlane } from "react-icons/fa";

import "./chat.scss";

const Chat = () => {
  return (
    <div className="main-chat d-flex flex-column">
      <header className="main-chat__header d-flex align-items-center">
        <img
          alt="..ddd"
          src="https://i.guim.co.uk/img/media/35eeb4f8297b0a0771a8dd6312e71058a3249e4a/0_102_2441_1464/master/2441.jpg?width=1200&height=1200&quality=85&auto=format&fit=crop&s=3960b3510fc62983d7fbe6ba096238b5"
        />
        <div>
          <h1>Denzel washington</h1>
          <small>online</small>
        </div>
        <IconContext.Provider value={{ size: "3rem" }}>
          <BsThreeDotsVertical />
        </IconContext.Provider>
      </header>
      <main className="main-chat__main">
        <div
          className=" main-chat__message main-chat__message__left d-flex"
          aria-current="true"
        >
          <img
            alt="..ddd"
            src="https://i.guim.co.uk/img/media/35eeb4f8297b0a0771a8dd6312e71058a3249e4a/0_102_2441_1464/master/2441.jpg?width=1200&height=1200&quality=85&auto=format&fit=crop&s=3960b3510fc62983d7fbe6ba096238b5"
          />
          <div className="ms-3">
            <div className="d-flex w-100  main-chat__message__content main-chat__message__content__left ">
              <p>
                simply dummy text of the printing and typesetting industry.
                Lorem Ipsum has been the industry's standard dummy text ever
                since the 1500s, when an unknown printer took a galley of type
                and scrambled it to make a type specimen book. It has survived
                not only five centuries, but also the leap into electronic
                typesetting, remaining essentially unchanged
              </p>
            </div>
            <p className=" main-chat__message__time">
              December 9, 2020 3:25 PM
            </p>
          </div>
        </div>
        <div
          className=" main-chat__message main-chat__message__right d-flex"
          aria-current="true"
        >
          <div className="ms-3">
            <div className="d-flex w-100  main-chat__message__content main-chat__message__content__right ">
              <p>
                simply dummy text of the printing and typesetting industry.
                Lorem Ipsum has been the industry's standard dummy text ever
                since the 1500s, when an unknown printer took a galley of type
                and scrambled it to make a type specimen book. It has survived
                not only five centuries, but also the leap into electronic
                typesetting, remaining essentially unchanged
              </p>
            </div>
            <p className=" main-chat__message__time">
              December 9, 2020 3:25 PM
            </p>
          </div>
          <img
            alt="..ddd"
            src="https://i.guim.co.uk/img/media/35eeb4f8297b0a0771a8dd6312e71058a3249e4a/0_102_2441_1464/master/2441.jpg?width=1200&height=1200&quality=85&auto=format&fit=crop&s=3960b3510fc62983d7fbe6ba096238b5"
          />
        </div>
        <div
          className=" main-chat__message main-chat__message__left d-flex"
          aria-current="true"
        >
          <img
            alt="..ddd"
            src="https://i.guim.co.uk/img/media/35eeb4f8297b0a0771a8dd6312e71058a3249e4a/0_102_2441_1464/master/2441.jpg?width=1200&height=1200&quality=85&auto=format&fit=crop&s=3960b3510fc62983d7fbe6ba096238b5"
          />
          <div className="ms-3">
            <div className="d-flex w-100  main-chat__message__content main-chat__message__content__left ">
              <p>
                and scrambled it to make a type specimen book. It has survived
                not only five centuries, but also the leap into electronic
                typesetting, remaining essentially unchanged
              </p>
            </div>
            <p className=" main-chat__message__time">
              December 9, 2020 3:25 PM
            </p>
          </div>
        </div>
        <div
          className=" main-chat__message main-chat__message__right d-flex"
          aria-current="true"
        >
          <div className="ms-3">
            <div className="d-flex w-100  main-chat__message__content main-chat__message__content__right ">
              <p>
                simply dummy text of the printing and typesetting industry.
                Lorem Ipsum has been the industry's standard dummy text ever
                since the 1500s, when an unknown printer took a galley of type
                and scrambled it to make a type specimen book. It has survived
                not only five centuries, but also the leap into electronic
                typesetting, remaining essentially unchanged
              </p>
            </div>
            <p className=" main-chat__message__time">
              December 9, 2020 3:25 PM
            </p>
          </div>
          <img
            alt="..ddd"
            src="https://i.guim.co.uk/img/media/35eeb4f8297b0a0771a8dd6312e71058a3249e4a/0_102_2441_1464/master/2441.jpg?width=1200&height=1200&quality=85&auto=format&fit=crop&s=3960b3510fc62983d7fbe6ba096238b5"
          />
        </div>
      </main>
      <footer className="main-chat__footer d-flex ">
        <textarea
          className="main-chat__footer__input"
          placeholder="Type a message"
        />
        <IconContext.Provider value={{ size: "2rem" }}>
          <div className="main-chat__footer__icons">
            <span className="paper-clip">
              <FiPaperclip />
            </span>
            <span className="paper-plane">
              <FaPaperPlane />
            </span>
          </div>
        </IconContext.Provider>
      </footer>
    </div>
  );
};

export default Chat;
