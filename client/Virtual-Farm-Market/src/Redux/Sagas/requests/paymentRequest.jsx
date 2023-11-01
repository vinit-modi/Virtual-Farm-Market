import Axios from "../../../Utils/Axios";

export async function requestAddNewCardPayment(payload) {
    console.log('PAYLOAD ===> ',payload)
    const response = await Axios.post(`/api/addNewCard`, payload);
    console.log('RESPONSE ===> ',response)
    return response;
  }