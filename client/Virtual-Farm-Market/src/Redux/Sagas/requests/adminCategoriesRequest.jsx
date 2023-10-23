import Axios from "../../../Utils/Axios";

export async function requestAllCategories(payload){
    // console.log('PAYLOAD ==>',payload)
    const response = await Axios.post(`/api/getAllCategory`)
    // console.log('RESPONSE ==>',response)
    return response
}
export async function requestEditCategories(payload){
    // console.log('PAYLOAD ==>',payload)
    const response = await Axios.post(`/api/editCategory`,payload)
    // console.log('RESPONSE ==>',response)
    return response
}
export async function requestEditStatusCategories(payload){
    console.log('PAYLOAD ==>',payload)
    const response = await Axios.post(`/api/changeCategoryStatus`,payload)
    console.log('RESPONSE ==>',response)
    return response
}