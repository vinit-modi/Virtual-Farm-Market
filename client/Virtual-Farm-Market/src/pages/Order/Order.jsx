import React from "react";
import OrderCard from "../../components/OrderCard/OrderCard";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { GET_ALL_ORDER } from "../../Redux/Reducers/OrderReducer";

function Order() {
    const dispatch = useDispatch()
    const order = useSelector(state=>state.order)
    
    useEffect(() => {
        dispatch({type:GET_ALL_ORDER})
        return ()=>{

        }
    }, []);

  return (
    <>
      <OrderCard />
    </>
  );
}

export default Order;
