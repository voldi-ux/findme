import types from './chat_types'


const fetchingChatsStart= () => ({
    type:types.FETCHING_CHATS_START
}) 
const fetchingChatsFail= () => ({
    type:types.FETCHING_CHATS_FAIL
}) 

const fetchingChatsSucceced= (chats) => ({
    type:types.FETCHING_CHATS_SUCCECED,
    payload:chats
}) 


export const fetchingChats= (id1) => async dispatch => {
    try {
        dispatch(fetchingChatsStart())
        const res = await fetch(`/getchats/${id1}`)
        const chats = await res.json()
        dispatch(fetchingChatsSucceced(chats))
    } catch (error) {
         
       dispatch(fetchingChatsFail())
    }
} 

// getting a chat partner from a database

const gettingPatnerStart = () => ({
    type:types.GET_CHAT_PARTNER_START
})
const gettingPatnerFail = (msg) => ({
    type:types.GET_CHAT_PARTNER_FAIL,
    payload:msg
})
const gettingPatnerSucceced = (partner) => ({
    type:types.GET_CHAT_PARTNER_SUCCECED,
    payload:partner
})


export const onGettingChatPrtner = (id) => async dispatch => {
   
    try {
        dispatch(gettingPatnerStart())
        const res = await fetch(`/getuserbyId/${id}`)
        const partner = await res.json()
        dispatch(gettingPatnerSucceced(partner))
    } catch (error) {    
       dispatch(gettingPatnerFail(error.message))
    }
}


//gettting messages

const gettingMessagesStart= () => ({
    type:types.GET_MESSAGES_START
})

const gettingMessagesFail= (err) => ({
    type:types.GET_MESSAGES_START,
    payload:err
})

const gettingMessagesSucceced= (messages) => ({
    type:types.GET_MESSAGES_START,
    payload:messages
})

export const onGettingMesssages = (id1,id2) =>async dispatch => {
    try {
        dispatch(gettingMessagesStart())
        const res = await fetch(`/messages/${id1}/${id2}`)
        const messages = await res.json()
        dispatch(gettingMessagesSucceced(messages))
    } catch (error) {    
       dispatch(gettingMessagesFail(error.message))
    }
}

//getting the room between the users 


const gettingRoomStart= () => ({
    type:types.GET_ROOM_START
})

const gettingRoomFail= (err) => ({
    type:types.GET_ROOM_FAIL,
    payload:err
})

const gettingRoomSucceced= (Room) => ({
    type:types.GET_ROOM_SUCCECED,
    payload:Room
})

export const onGettingRoom = (id1,id2) => async dispatch => {
    try {
        dispatch(gettingRoomStart())
        const res = await fetch(`/getroom/${id1}/${id2}`)
        const Room = await res.json()
        dispatch(gettingRoomSucceced(Room))
    } catch (error) {    
       dispatch(gettingRoomFail(error.message))
    }
}
