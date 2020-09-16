import React, {createContext,useReducer} from 'react'


const init = {
    age:'',
    country:'',
    town:'',
    gender:''
  }


const types = {
    CLEAR_STATE:'CLEAR_STATE',
    SET_STATE : ' SET_STATE',
    INCREMENT_PAGE_NO:'INCREMENT_PAGE_NO',
    DECREMENT_PAGE_NO:'DECREMENT_PAGE_NO'
}
// export const increntPageNum = (state) => {
//     if(state.data.length) {
//         return {
//             ...state,
//             page: state.page + 1
//         }
//     }
//     return state
// } 
// export const decrentPageNum = (state) => {
    
//         return {
//             ...state,
//             page: state.page - 1
    
//     }
// } 

  const reducer = (state, action) => {
      switch(action.type) {
          case types.SET_STATE:
              return {
                  ...state,
                  ...action.payload
              }
          case types.CLEAR_STATE:
              return {
                  ...state,
                  age:'',
                  gender:''
              }
       default:
           return state
      }
  } 
  export const FilterProfileContext = createContext()
 


  const FiltercontextProvider = (props) => {
    const [state,dispatch] = useReducer(reducer, init)

    const clearState = () => dispatch({
        type:types.CLEAR_STATE
    })

    const setState = (data) => dispatch({
        type:types.SET_STATE,
        payload:data
    })
   



    return <FilterProfileContext.Provider value={{
        filterData: {
        age:state.age,
        country:state.country,
        town:state.town,
        gender:state.gender,
        },
        setState,
        clearState
    }} >
        {props.children}
    </FilterProfileContext.Provider>
  }


export default FiltercontextProvider