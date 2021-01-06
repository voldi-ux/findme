

export const filteredData = (oldData, filerterContent) => {
    console.log(filerterContent)
 const {gender,province,town} = filerterContent;

 return oldData.filter(data =>  data.gender === gender || data.province === province || data.town === town)
// return oldData

}

export const increntPageNum = (state) => {
    if(state.data.length) {
        return {
            ...state,
            page: state.page + 1
        }
    }
    return state
} 
export const decrentPageNum = (state) => {
    
        return {
            ...state,
            page: state.page - 1
    
    }
} 

//filter the  users with the hasProfile property set to true, and return them.

export const fliterUsers = (profiles) => {
console.log('filtering ',profiles)
    return profiles.filter((profile => profile.hasProfile === true))
} 