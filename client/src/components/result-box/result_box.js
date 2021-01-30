import React, { useEffect ,useState} from "react";
import { useHistory } from "react-router-dom";
import "./result_box.scss";
import Button from "../buttons/button";
import { AiOutlinePhone } from "react-icons/ai";
import { MdLocationCity } from "react-icons/md";
import { IconContext } from "react-icons";
import { setSearchedProfile } from "../../redux/user/user_action";
import { connect } from "react-redux";
import { onGettingRoom, setChatData } from "../../redux/chat/chat_actions";
import { checkRoom } from "../../utils/chats.utils";
import { colors } from "../../border colors/colors";

const ResultBox = ({
  profile,
  setSearchProfile,
  setChat,
  rooms,
  createRoom,
  userId,
  Profile,
}) => {

  const history = useHistory();
  let [borderStyle,setborderStyle] = useState(null);
  useEffect(() => {
    setborderStyle({
      borderWidth: "2px",
      borderStyle: "solid",
      borderColor: colors[Math.floor(Math.random()*28 )],
    }) 
  },[]);
  
  return (
    <div className="result__box">
      <div className="result__group-1">
        <span className="result__img">
          <img
            src={profile.profile.avatarUrl}
            alt="avatar"
            style={borderStyle}
          />
        </span>
        <div className="result__details d-flex flex-column">
          <span className="result__name mb-1">
            {profile.profile.name} {profile.profile.surname}
          </span>
          <span className="result__title"> {profile.profile.title} </span>
        </div>
      </div>
      <div className="result__footer">
        <IconContext.Provider
          value={{ className: "result__icon", size: "4rem" }}
        >
          <div className="result__group-2">
            <MdLocationCity />
            <span className="result__footerDetail">{profile.profile.city}</span>
          </div>
          <div className="result__group-2">
            <AiOutlinePhone />
            <span className="result__footerDetail">
              {profile.profile.phone}
            </span>
          </div>
        </IconContext.Provider>
      </div>
      <div className="buttons">
        <Button
          value="profile"
          onClick={() => {
            setSearchProfile(profile);
            history.push(`/profile/`);
          }}
        />

        <Button
          value="message"
          outline={true}
          onClick={async () => {
            const room = checkRoom(profile._id, rooms);
            if (room) {
              await history.push(`/chatroom`);

              setChat({
                profile,
                room: room,
                messages: room.messages,
              });
              return;
            }

            setChat({
              profile,
              room: null,
              messages: null,
            });

            await history.push(`/chatroom`);

            setTimeout(() => {
              createRoom(userId, profile._id);
            }, 2000);
          }}
        />
      </div>
    </div>
  );
};

const mapDispatch = (dispatch) => ({
  setSearchProfile: (profile) => dispatch(setSearchedProfile(profile)),
  setChat: (data) => dispatch(setChatData(data)),
  createRoom: (id1, id2) => dispatch(onGettingRoom(id1, id2)),
});
const mapState = ({ user }) => ({
  rooms: user.CurrentUser.chatroomIds,
  userId: user.CurrentUser._id,
});
export default connect(mapState, mapDispatch)(ResultBox);
