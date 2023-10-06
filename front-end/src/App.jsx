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
        <Route path="/payment" element={<Payment/>}/>
        <Route path="/signUp" element={<SignUp/>}/>
      </Routes>
    </>
  );
}

export default App;
