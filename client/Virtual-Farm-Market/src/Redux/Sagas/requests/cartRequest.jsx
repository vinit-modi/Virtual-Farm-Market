import Axios from "../../../Utils/Axios"

export function requestGetAddProductToCart (payload){
    const response = Axios.post(`/api/addToCart`,payload)
    return response
}

export function requestGetRemoveProductToCart (payload){

    //add new API here for remove
    const response = Axios.post(`/api/addToCart`,payload)
    return response
}

// export function requestGetRemoveProductToCart (payload){

//     //add new API here for remove
//     const response = Axios.post(`/api/addToCart`,payload)
//     return response
// }

export function requestGetAllProductCart (){
    const response = Axios.get(`/api/getCartProducts`)
    return response
}

