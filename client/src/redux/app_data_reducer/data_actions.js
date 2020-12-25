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
export const fetchMoreProfilesStart = () => ({
    type:types.FETCHING_MORE_PROFILES_FAIL
})

export const fetchMoreProfilesFails = (msg) => ({
    type:types.FETCHING_MORE_PROFILES_FAIL,
    payload:msg
})
export const fecthMoreProfileSucceced = (profiles) => ({
    type:types.FETCHING_MORE_PROFILES_SUCCECED,
    payload:profiles
})

export const onFechingProfiles = (pageNun) => async (dispacth) => {
    dispacth(fetchProfilesStart)
     try {
        const resp = await fetch(`/getProfiles/4/${pageNun}`)
        const profiles = await resp.json()
        dispacth(fecthProfileSucceced(profiles))
     } catch (error) {
         dispacth(fetchProfilesFails(error.message))
     }
}



export const onFechingMoreProfiles = (profilesCount) => async (dispacth) => {
    dispacth(fetchMoreProfilesStart)
     try {
        const resp = await fetch(`/getProfiles/4/${profilesCount}`)
        const profiles = await resp.json()
        dispacth(fecthMoreProfileSucceced(profiles))
     } catch (error) {
         dispacth(fetchMoreProfilesFails(error.message))
     }
}


export const fetchFilterProfilesFails = (msg) => ({
    type:types.FETCHING_FilTER_DATA_FAIL,
    payload:msg
})
export const fecthFilterProfileSucceced = (profiles) => ({
    type:types.FETCHING_FilTER_DATA_SUCCECED,
    payload:profiles
})

export const onFechingFilterProfiles = (FilteredData) => async (dispacth) => {
    console.log(FilteredData)
    dispacth(fetchProfilesStart)
     try {
        const resp = await fetch(`/getfilteredProfiles`,{
            method:'post',
            headers: {
                'Content-Type':'application/json'
            },
            body: JSON.stringify(FilteredData)
        })

        const profiles = await resp.json()
        console.log(profiles)
        dispacth(fecthProfileSucceced(profiles))
     } catch (error) {
         dispacth(fetchProfilesFails(error.message))
     }
}



