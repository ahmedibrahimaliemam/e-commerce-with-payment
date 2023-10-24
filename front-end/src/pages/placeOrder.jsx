import { Link, useNavigate } from "react-router-dom";
import "./placeOrder.css";
import { useDispatch, useSelector } from "react-redux";
import { Helmet } from "react-helmet-async";
import PaymentLine from "../smComponent/paymentLine";
import { useEffect, useState } from "react";
import { saveCart } from "../rtk/slices/cartSlice";
import axios from "axios";
import Spinner from "../smComponent/Spinner";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { clearCart } from "../rtk/slices/productSlice";

const placeOrder = () => {
  const productInCart = useSelector((state) => state.product);
  const userInfoState = useSelector((state) => state.userInfo);
  const paymentState = useSelector((state) => state.payment);
  const user = useSelector((state) => state.users);
  const price = productInCart.reduce(
    (acc, current) => current.price * current.quantity + acc,
    0
  );
  const tax = (price * 3) / 100;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const placeOrderHandler = async () => {
    setLoading(true);
    await axios
      .post(
        "http://localhost:5000/order/api",
        {
          orderItems: productInCart,
          shippingAddress: userInfoState,
          paymentMethod: paymentState.paymentMethod,
          itemsPrice: price,
          shippingPrice: 0,
          taxPrice: tax,
          totalPrice: price + tax,
        },
        {
          headers: {
            authorization: `Bearer ${user.token}`,
          },
        }
      )
      .then((res) => {
        setLoading(false);
        navigate(`/placeorder/${res.data._id}`);
        dispatch(clearCart()) ;
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
        toast.error("error to post data", {
          position: "bottom-center",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
      });
  };
  useEffect(() => {
    if (!paymentState.paymentMethod) {
      navigate("/payment");
    } else {
      dispatch(
        saveCart({ productInCart, userInfoState, paymentState, price, tax })
      );
    }
  }, []);
  return (
    <>
      <ToastContainer
        position="bottom-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
      <PaymentLine active2="active-2" num="100" />
      <Helmet>
        <title>Place Order</title>
      </Helmet>
      <h1 className="text-center font-bold text-3xl my-5">preview Order</h1>
      <div className="place-order">
        <div className="place-order-div1">
          <div className="shipping-content">
            <h1>shipping</h1>
            <p>
              Name: <span>{userInfoState.name}</span>
            </p>
            <p>
              Address: <span>{userInfoState.address}</span>
            </p>
            <Link to={`/shipping`}>Edit</Link>
          </div>
          <div className="payment-method">
            <h1>Payment</h1>
            <p>
              Method: <span>{paymentState.paymentMethod}</span>
            </p>
            <Link to={`/payment`}>Edit</Link>
          </div>
          <div className="items">
            <h1>Items</h1>
            {productInCart.map((product) => (
              <div key={product._id} className="product-item">
                <img src={product.image} alt={product.name} />
                <Link to={`/products/${product._id}`}>{product.name}</Link>
                <p>{product.quantity}</p>
                <p>${product.price * product.quantity}</p>
                <Link to={"/products/cart"}>Edit</Link>
              </div>
            ))}
          </div>
        </div>
        <div className="place-order-div2">
          <h1>Order Summary</h1>
          <span>Items ${price}</span>
          <hr />
          <span>Shipping $0</span>
          <hr />
          <span>Tax ${tax}</span>
          <hr />
          <span>orderTotal ${price + tax}</span>
          <hr />
          <button
            onClick={placeOrderHandler}
            className="btn btn-dodger btn-center">
            Place Order
          </button>
          {loading ? <Spinner /> : null}
        </div>
      </div>
    </>
  );
};
export default placeOrder;
