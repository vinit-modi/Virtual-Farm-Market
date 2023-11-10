import Axios from '../../../Utils/Axios'

export function requestGetCategoryListProduct (){
    const response = Axios.get(`/api/categoriesForProduct`)
    return response
}

export function requestGetAllProduct (){
    const response = Axios.get(`/api/getAllProducts`)
    return response
}