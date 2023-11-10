import Axios from '../../../Utils/Axios'

export function requestGetCategoryListProduct (){
    const response = Axios.get(`/api/categoriesForProduct`)
    return response
}

export function requestGetAllProduct (){
    const response = Axios.get(`/api/getAllProducts`)
    return response
}

export function requestGetProductsByCategory_Product (payload){
    const response = Axios.post(`/api/getPorductsByCategory`,payload)
    return response
}
export function requestGetObjectProduct (payload){
    const response = Axios.post(`/api/getProduct`,payload)
    return response
}