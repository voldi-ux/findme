import types from './user_types'
import userTypes from './user_types'

export const loginStart = () => ({
  type:userTypes.LOG_IN_START
})
export const logOut = () => ({
  type:userTypes.LOG_OUT
})


export const loginFail = (msg) => ({
    type:userTypes.LOG_IN_FAIL,
    payload:msg
})

export const loginSucceced = (data) => ({
    type: userTypes.LOG_IN_SUCCECEDED,
    payload:data
})

export const fecthUserProfileStart = () => ({
  type:userTypes.FETCH_USER_PROFILE_START
})

export const fecthUserProfileSucceced = (profile) => ({
  type:userTypes.FETCH_USER_PROFILE_SUCCECEDED,
  payload:profile
})

export const loggingInUser = (userInput) =>{ 
    
    return  async (dispatch) => {
     dispatch(loginStart())
      try {
          
        const resp = await fetch('http://localhost:5000/signin/', {
            method:'PUT',
            headers: {
                'Content-Type': 'application/json'
              },
            body: JSON.stringify(userInput) 
        })
      const data = await resp.json()
          if(data.type === 'success') {
            dispatch(loginSucceced(data))
            dispatch(fecthUserProfileStart())
            const resp = await fetch(`http://localhost:5000/getuserprofile/${data.userId}`)
            const profile = await resp.json()
             dispatch(fecthUserProfileSucceced(profile))
          } else if(data.type === 'error') {
            dispatch(loginFail(data.message))
          }
      } catch (error) {
          error.message = 'something went wrong please try again letter'
          dispatch(loginFail(error))
      }
}

}