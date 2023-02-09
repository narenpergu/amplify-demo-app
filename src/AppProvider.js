import { createContext, useEffect } from "react";
import { API } from 'aws-amplify';
import { useState } from 'react';
//import { listTodos } from './graphql/queries'
//import { deleteTodo , createTodo } from "./graphql/mutations"

const AppContext=createContext();
const AppProvider=(props)=>{

   
    
    const [viewOrders,setViewOrders]=useState(false);
    const [addOrder,setAddOrder]=useState(false);
    const [orders,setOrders]=useState([]);
    const [updateOrder,setUpdateOrder]=useState(false);
    
    const [order,setOrder]=useState({
        id:"",
        itemName:"",
        quantity:""
    });
   
    const [orderstateChanged,setOrderStateChanged]=useState(false);
    

    
    const getApiName="getOrder";
    const getPath="/getOrder";
   

    const deleteApiName="deleteApi";
    const deletePath="/deleteOrder";

    const addApiName="addApi";
    const addPath="/addOrder";

    const updateApiName="updateOrder";
    const updatePath="/updateOrder";

    useEffect(()=>{
        getOrders();
    },[orderstateChanged])

    const onchangeHandle=({target:{id,value}})=>{
        setOrder({...order,[id]:value});
    }

    const onAddOrderHandler=()=>{
        setAddOrder(true);
        setViewOrders(false);
    }

    const getOrders=async ()=>{
        await API.get(getApiName,getPath)
        .then((data)=>{
            setOrders(data);
            setViewOrders(true);
            setAddOrder(false);
            setUpdateOrder(false);
        })
        .catch(e=>console.log(e));
      
        
    }

    const deleteOrder=async(order)=>{
        await API.del(deleteApiName,deletePath,{
            body:order
        })
        .then(data=>{
            console.log(data);
          
            setOrderStateChanged(!orderstateChanged);
        })
        .catch(err=>console.log(err))
    }

    const addorder=async (event)=>{
        event.preventDefault();
        await API.post(addApiName,addPath,{
            body: order
        })
        .then(data=>{
            console.log(data);
            getOrders();
            setViewOrders(true);
        })
        .catch(err=>console.log(err))
        event.target.reset();
    }

    const updateOrderHandler=(order)=>{
        setOrder({...order});
        setViewOrders(false);
        setUpdateOrder(true);
    }

    const updateorder=async(event)=>{
        event.preventDefault();
        await API.put(updateApiName,updatePath,{
            body:order
        })
        .then(data=>{
            console.log(data);
           setUpdateOrder(false);
            setOrderStateChanged(!orderstateChanged);
        })
        .catch(err=>console.log(err))
    }
    


return (
    <AppContext.Provider
      value={{ viewOrders, addorder, orders , order,deleteOrder, onchangeHandle,onAddOrderHandler ,addOrder,
        updateOrderHandler,updateOrder,updateorder
        }}
    >
      {props.children}
    </AppContext.Provider>
  );
}
export {AppProvider, AppContext};