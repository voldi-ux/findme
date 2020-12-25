

export const filteredData = (oldData, filerterContent) => {
    console.log(filerterContent)
 const {age,gender,country,town} = filerterContent;

 return oldData.filter(data => data.age > +age || data.gender === gender || data.country === country || data.from === town)
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
console.log(profiles)
    return profiles.filter((profile => profile.hasProfile === true))
} 