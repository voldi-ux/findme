import types from './chat_types'

export const onSeenMessage = (messages) => ({
    type:types.SEEN_MESSAGE,
    payload:messages
})
const fetchingChatsStart= () => ({
    type:types.FETCHING_CHATS_START
}) 
const fetchingChatsFail= () => ({
    type:types.FETCHING_CHATS_FAIL
}) 

const fetchingChatsSucceed= (chats) => ({
    type:types.FETCHING_CHATS_SUCCEED,
    payload:chats
}) 

export const setChatData = data => (
     {
         type:types.SET_CHAT_DATA,
         payload:data
     }
)


export const fetchingChats= (id1) => async dispatch => {
    try {
        dispatch(fetchingChatsStart())
        const res = await fetch(`/getchats/${id1}`)
        const chats = await res.json()
        dispatch(fetchingChatsSucceed(chats))
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
const gettingPatnerSucceed = (partner) => ({
    type:types.GET_CHAT_PARTNER_SUCCEED,
    payload:partner
})


export const onGettingChatPrtner = (id) => async dispatch => {
   
    try {
        dispatch(gettingPatnerStart())
        const res = await fetch(`/getuserbyId/${id}`)
        const partner = await res.json()
        dispatch(gettingPatnerSucceed(partner))
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

const gettingMessagesSucceed= (messages) => ({
    type:types.GET_MESSAGES_START,
    payload:messages
})

export const onGettingMesssages = (roomId) =>async dispatch => {
    try {
        dispatch(gettingMessagesStart())
        const res = await fetch(`/messages/${roomId}`)
        const messages = await res.json()
        if(messages.msg === 'okay') {
         return  dispatch(gettingMessagesSucceed(messages))
        }
         alert('something went wrong, please ensure that yout have an internet connection and refresh the page')
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

const gettingRoomSucceded= (Room) => ({
    type:types.GET_ROOM_SUCCEED,
    payload:Room
})

export const onrecieveMessage= (msg) => ({
    type:types.UPDATE_MESSAGE,
    payload:msg
})

export const onGettingRoom = (id1,id2) => async dispatch => {
    try {
        dispatch(gettingRoomStart())
        const res = await fetch(`/getroom/${id1}/${id2}`)
        const Room = await res.json()
        dispatch(gettingRoomSucceded(Room))
    } catch (error) {    
       dispatch(gettingRoomFail(error.message))
    }
}
