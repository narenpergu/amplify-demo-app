import { useContext } from 'react';
import { AppContext } from '../AppProvider';

const UpdateOrder=()=>{
    const {updateorder,onchangeHandle,order}=useContext(AppContext);
    return(
        <div>
            <form id="form" onSubmit={updateorder}>
                <label htmlFor="itemName">Item Name : </label>
                <input type="text" id="itemName" value={order.itemName} class="form-control form-control-sm" onChange={onchangeHandle}/><br/>
                <label htmlFor="quantity">Quantity : </label>
                <input type="text" id="quantity" value={order.quantity} class="form-control form-control-sm" form="form" onChange={onchangeHandle} style={{marginTop:"1%"}}/><br/>
                <button type="submit" className="btn btn-primary">Update</button>

                <div>
        </div>
                
            </form>
        </div>
       
    )
}
export default UpdateOrder;