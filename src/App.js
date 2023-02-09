import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import ViewOrders from './components/ViewOrders';
import HeaderComponent from './components/HeaderComponent';
import FooterComponent from './components/FooterComponent';
import AddOrder from './components/AddOrder';
import { useContext } from "react";
import {AppContext} from './AppProvider';
import UpdateOrder from './components/UpdateOrder';

function App() {
  const {
    viewOrders,getOrders,addOrder,onAddOrderHandler,updateOrder
  }=useContext(AppContext);
  return (
    <div className="App">
     
      <HeaderComponent/>
      <h2 className="text-center">Orders List</h2>
      <br></br>
     {
       viewOrders && (<ViewOrders/>)
     }
     {
        addOrder && (<AddOrder/>)
     }
      {
        updateOrder && (<UpdateOrder/>)
      }
     <FooterComponent/>
    </div>
  );
}

export default App;
