//remove the current user from the chats array
export const modifiedChatArray = (chats, currentUser) => {
  console.log(chats,currentUser);

  if (chats.length > 0) {
    return chats.reduce((acc, chat) => {
       
      if (
        chat.user1._id === currentUser._id
      ) {
        acc = [
          ...acc,
          { ...chat.user2, messages: chat.messages, room: { _id: chat._id } },
        ];
      } else if (
        chat.user2._id === currentUser._id
      ) {
        acc = [
          ...acc,
          { ...chat.user1, messages: chat.messages, room: { _id: chat._id } },
        ];
      }
      return acc;
    }, []);
  } else {
    return chats;
  }
};

//chek if the messages array is empty
export const isMessagesEmpty = (chats) =>
  chats.filter((chat) => chat.messages.length >= 1);

//custom compose funtion
export const CustomCompose = (chats, currentUser) => (f, g) =>
  f(g(chats, currentUser));

//check if the the users have  already established a room, if yes, find the room and return it. else return a boolean and then dispatch an action that will creat a new room between the users. render a spinner while creating a room
export const checkRoom = (userId, ArrOfrooms) => {
  const room = ArrOfrooms.find(
    (room) => room.user1 === userId || room.user2 === userId
  );
  if (room) {
    return room;
  }
  return false;
};

export const unSeenMsgCount = ({ userName, messages }) => {
  let count = 0;
  for (var i = 0; i < messages.length; i++) {
    if (messages[i].name === userName && messages[i].seen === false) {
      count++;
    }
  }
  return count;
};

export const getNotifications = async (userId, type) => {
  try {
    let resp = await fetch("/updateNotifications", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId,
        type,
      }),
    });
    let count = await resp.json();
    if (type === "get") {
      return count;
    }
  } catch (error) {
    console.log(error.message);
    // alert(
    //   "faild to load notifications, ensure that you have an internet connection"
    // );
  }
};
