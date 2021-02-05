export const updateMessages = (room,chats) => {
    if(!room) return []
     const roomId = room._id
     const chat =  chats.find(chat => chat._id === roomId)
     if(!chat) return []
     console.log(chat)
     return chat.messages;
}