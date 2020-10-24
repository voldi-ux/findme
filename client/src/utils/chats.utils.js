


//remove the current user from the chats array
export const modifiedChatArray = (chats,currentUser) => {

    if(chats.length > 0) {
        return chats.reduce((acc,chat,index) => {
            console.log('before modification',chats)
            if(chat.user1._id === currentUser._id) {
                acc = [...acc,{...chat.user2,messages:chat.messages}]
            } else if( chat.user2._id === currentUser._id) {
                acc = [...acc, {...chat.user1,messages:chat.messages}]
            }
            console.log('after modification',acc)
            return acc
        },[])
    } else {
        return chats
    }
}

//chek if the messages array is empty 
export const isMessagesEmpty = (chats) => chats.reduce((acc,chat) => {
        if(chat.messages.length) {
           acc = [...acc, {_id:chat._id, name:chat.userName,messages:chat.messages[chat.messages.length -1], avatarUrl:chat.avatarUrl}]
        }

        return acc
},[])

//custom compose funtion
export const CustomCompose = (chats,currentUser) => (f,g) => f(g(chats,currentUser)) 


