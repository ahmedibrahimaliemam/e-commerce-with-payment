import "./App.css";
import Header from "./smComponent/Header";
import Main from "./pages/Main";
import { Route, Routes } from "react-router-dom";
import ProductScreen from "./pages/ProductScreen";
import ProductsInCart from "./pages/productsInCart";
import SignIn from "./pages/signIn";
import Shipping from "./pages/Shipping";
import Payment from "./pages/Payment";
import SignUp from "./pages/signUp";
import PlaceOrder from "./pages/placeOrder";
import OrderScreen from "./pages/orderScreen";
import OrderHistory from "./pages/orderHistory";
import ProfileScreen from "./pages/profileScreen";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/products/:id" element={<ProductScreen />} />
        <Route path="/products/cart" element={<ProductsInCart />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/shipping" element={<Shipping />} />
        <Route path="/payment" element={<Payment />} />
        <Route path="/signUp" element={<SignUp />} />
        <Route path="/placeorder" element={<PlaceOrder />} />
        <Route path="/placeorder/:id" element={<OrderScreen/>}/>
        <Route path="/orderhistory" element={<OrderHistory/>}/>
        <Route path="/profile" element={<ProfileScreen/>}/>
      </Routes>
    </>
  );
}

export default App;
