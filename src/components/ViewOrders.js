import { useContext } from "react";
import {AppContext} from '../AppProvider';


const ViewOrders=()=>{

    const {deleteOrder,orders,updateOrderHandler,onAddOrderHandler}=useContext(AppContext);
    return(
        <div>
            <div>
            <button type="button" className="btn btn-primary" onClick={onAddOrderHandler} > Add Orders</button>
        </div>
        <br></br>
            <div className = "row">
                <table className = "table table-striped table-bordered">

                    <thead>
                     <tr>
                        <th> Item Name</th>
                        <th> Quantity</th>
                        <th>Actions</th>
                        </tr>
                     </thead>
                     <tbody>
                                {
                                    orders.map(
                                        (order) => {
                                            return ( <tr >
                                                <td> { order.itemName} </td>   
                                                <td> {order.quantity}</td>
                                                <td>
                                                <button style={{marginLeft: "10px"}} onClick={ () => {deleteOrder(order)}} className="btn btn-danger">Delete </button>
                                               <button onClick={ () => {updateOrderHandler(order)}} className="btn btn-info">Update </button>
                                                </td>
                                           </tr>)
                                        } 
                                    )
                                }
                            </tbody>
                        </table>

                 </div>
                 </div>
                    
     )
    
}
export default ViewOrders;