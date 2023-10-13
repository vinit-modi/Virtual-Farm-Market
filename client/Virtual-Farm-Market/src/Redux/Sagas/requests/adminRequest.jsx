import Axios from "../../../Utils/Axios";

export async function requestAdminLogin(payload) {
    const response = await Axios.post(`/api/adLogin`, payload);
    console.log(response)
    return response;
  }