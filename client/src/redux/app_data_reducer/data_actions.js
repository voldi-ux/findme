import { fecthUserProfileStart, fecthUserProfileSucceced } from '../user/user_action'
import types from './data_types'


export const filterData = (data) => ({
    type: types.FILTER_DATA,
    payload:data
})


export const fetchProfilesStart = () => ({
    type:types.FETCHING_FilTER_DATA_START
})

export const fetchProfilesFails = (msg) => ({
    type:types.FETCHING_PROFILES_FAIL,
    payload:msg
})
export const fecthProfileSucceced = (profiles) => ({
    type:types.FETCHING_PROFILES_SUCCECED,
    payload:profiles
})

export const onFechingProfiles = (pageNun) => async (dispacth) => {
    dispacth(fetchProfilesStart)
     try {
        const resp = await fetch(`http://localhost:5000/getProfiles/4/${pageNun}`)
        const profiles = await resp.json()
        console.log(profiles)
        dispacth(fecthProfileSucceced(profiles))
     } catch (error) {
         dispacth(fetchProfilesFails(error.message))
     }
}