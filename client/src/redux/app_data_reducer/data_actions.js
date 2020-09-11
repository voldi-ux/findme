import types from './data_types'


export const filterData = (data) => ({
    type: types.FILTER_DATA,
    payload:data
})