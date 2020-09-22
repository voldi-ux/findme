
export const modifiedChatArray = (chats,currentUser) => {

    return chats.reduce((acc,chat,index) => {
        if(chat.user1._id === currentUser._id) {
            acc = [...acc,{...chat.user2,messages:chat.messages}]
        } else if( chat.user2._id === currentUser._id) {
            acc = [...acc, {...chat.user1,messages:chat.messages}]
        }
        return acc
    },[])
}