import { useContext } from 'react';
import { AppContext } from '../AppProvider';

const AddOrder=()=>{
    const {addorder,onchangeHandle,getOrders}=useContext(AppContext);
    return(
        <div>
            <form id="form" onSubmit={addorder}>
                <label htmlFor="itemName">Item Name : </label>
                <input type="text" id="itemName" class="form-control form-control-sm" onChange={onchangeHandle}/><br/>
                <label htmlFor="quantity">Quantity : </label>
                <input type="text" id="quantity" class="form-control form-control-sm" form="form" onChange={onchangeHandle} style={{marginTop:"1%"}}/><br/>
                <button type="submit" className="btn btn-primary">Add</button>

                <div>
        </div>
                
            </form>
        </div>
       
    )
}
export default AddOrder;