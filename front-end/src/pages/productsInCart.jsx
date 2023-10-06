import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import "./cart.css";
import {
  decrement,
  deleteFromCart,
  increment,
} from "../rtk/slices/productSlice";

const ProductsInCart = () => {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.product);
  //to manage checkout handler
  const navigate = useNavigate();
  const quantity = products.reduce((acc, product) => acc + product.quantity, 0);
  const total = products.reduce((acc, c) => acc + c.price * c.quantity, 0);
  //manage local storage to save items in the cart if refresh page
  localStorage.setItem("products", JSON.stringify(products));

  return (
    <div>
      <h1 className="font-bold text-4xl text-center my-7">Shopping Cart</h1>
      <div className="cart-container">
        <div className="products-table">
          {products.length ? (
            products.map((product) => (
              <div key={product._id} className="product">
                <div className="product-info">
                  <img src={product.image} alt={product.name} />
                  <Link className="link" to={`/products/${product._id}`}>
                    {product.name}
                  </Link>
                </div>
                <div className="quantity-controll">
                  <i
                    className="fa-solid fa-circle-minus"
                    onClick={() => {
                      dispatch(decrement(product));
                    }}></i>
                  <span>{product.quantity}</span>
                  <i
                    className="fa-solid fa-circle-plus"
                    onClick={() => {
                      dispatch(increment(product));
                    }}></i>
                </div>
                <p className="product-price">${product.price}</p>
                <i
                  className="fa-solid fa-trash"
                  onClick={() => {
                    dispatch(deleteFromCart(product));
                  }}></i>
                <hr />
              </div>
            ))
          ) : (
            <h1 className="font-bold text-xl text-center bg-cyan-100 min-h-full">
              cart is empty{" "}
              <Link className="link" to="/">
                go to shopping
              </Link>
            </h1>
          )}
        </div>

        <div className="payment-info">
          <h1>
            Subtotal({quantity}-items):${total}
          </h1>
          <hr />
          <button onClick={()=>navigate("/signin?redirect=/shipping")}>proceed to checkout</button>
        </div>
      </div>
    </div>
  );
};
export default ProductsInCart;
