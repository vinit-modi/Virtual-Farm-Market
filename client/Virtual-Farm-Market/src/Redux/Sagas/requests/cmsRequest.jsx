import Axios from "../../../Utils/Axios";

//User:-
export function requestCmsForUser(payload){
    const response = Axios.post(`/api/getCmsForUser`,payload)
    return response
}

//Admin:-
export function requestCmsObjectForAdmin(payload){
    const response = Axios.post(`/api/getSpecificCms`,payload)
    return response
}
export function requestCmsUpdateForAdmin(payload){
    const response = Axios.post(`/api/updateCms`,payload)
    return response
}
