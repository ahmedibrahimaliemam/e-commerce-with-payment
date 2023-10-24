import axios from "axios";
import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import Spinner from "../smComponent/Spinner";
import { PayPalButtons, usePayPalScriptReducer } from "@paypal/react-paypal-js";
import { toast } from "react-toastify";

const OrderScreen = () => {
  const cart = useSelector((state) => state.cart);
  const userState = useSelector((state) => state.users);
  const navigate = useNavigate();
  console.log(userState._id);
  const [loading, setLoading] = useState(false);
  const [order, setOrder] = useState({});
  const [orderItems,setOrderItems]=useState([])
  const [{ isPending }, paypalDispatch] = usePayPalScriptReducer();
  const [payLoading, setPayLoading] = useState(false);
  const [payData, setPayData] = useState(false);
  const { id } = useParams();
  const fetchOrder = async () => {
    setLoading(true);
    await axios.get(`http://localhost:5000/order/api/${id}`, {
        headers: {
          authorization: `Bearer ${userState.token}`,
        },
      })
      .then((res) => {
        console.log(`hello ahmed data is`, res.data);
        setOrder(res.data);
        setOrderItems(res.data.orderItems)
        setLoading(false);
      })
      .catch((err) => {
        console.log(`error to fetch order`);
        setLoading(false);
      });
  };
  const loadPaypalScript = async () => {
    await axios
      .get("http://localhost:5000/api/keys/paypal", {
        headers: {
          authorization: `Bearer ${userState.token}`,
        },
      })
      .then((res) => {
        setPayLoading(false);
        setPayData(res.data);
        paypalDispatch({
          type: "resetOptions",
          value: {
            clientId: res.data,
            currency: "USD",
          },
        });
        paypalDispatch({
          type: "setLoadingStatus",
          value: "pending",
        });
      })
      .catch((err) => console.log(err));
  };
  function createOrder(data, actions) {
    return actions.order
      .create({
        purchase_units: [
          {
            amount: { value: order.totalPrice },
          },
        ],
      })
      .then((orderID) => orderID)
      .catch((err) => {
        console.log(`errror in create`);
      });
  }
  function onApprove(data, actions) {
    return actions.order.capture().then(async (details) => {
      console.log(`details`, details);
      setPayLoading(true);
      try {
        await axios
          .put(`http://localhost:5000/order/api/${id}/pay`, details, {
            headers: {
              authorization: `Bearer ${userState.token}`,
            },
          })
          .then((res) => {
            console.log(`succcces`);
            console.log(res.data);
            setPayLoading(false);
            toast.success(`order is paid`);
          });
      } catch (err) {
        console.log(`errorrrrrrrr`);
        setPayLoading(false);
        toast.error(`error in onApprove`);
      }
    });
  }
  function onError(err) {
    console.log(err);
    console.log(`error on error`);
    toast.error(`error!`);
  }
  useEffect(() => {
    if (!cart.userInfoState) {
      navigate("/login");
    }

    fetchOrder();
    loadPaypalScript();
  }, [paypalDispatch,id,navigate]);
  console.log("order is", order)
  return (
    <>
      <Helmet>
        <title>Place Order</title>
      </Helmet>
      {loading ? (
        <Spinner />
      ) : (
        <>
          <h1 className="text-center font-bold text-3xl my-5">order:{id}</h1>
          <div className="place-order">
            <div className="place-order-div1">
              <div className="shipping-content">
                <h1 className="font-bold">shipping</h1>
                <p>
                  Name: <span>{userState.name}</span>
                </p>
                <p>
                  Address: <span>{cart.userInfoState.address}</span>
                </p>
                <h1 className="bg-red-200 text-red-700 p-4">Not delivered</h1>
              </div>
              <div className="payment-method">
                <h1>Payment</h1>
                <p>
                  Method: <span>{order.paymentMethod}</span>
                </p>
                {<h1 className="bg-red-200 text-red-700 p-4">Not paid</h1>}
              </div>
              <div className="items">
                <h1>Items</h1>
                {orderItems.map((product) => (
                  <div key={product._id} className="product-item">
                    <img src={product.image} alt={product.name} />
                    <Link to={`/products/${product._id}`}>{product.name}</Link>
                    <p>{product.quantity}</p>
                    <p>${product.price * product.quantity}</p>
                    <Link to={"/products/cart"}></Link>
                  </div>
                ))}
              </div>
            </div>
            <div className="place-order-div2">
              <h1>Order Summary</h1>
              <span>Items ${order.totalPrice - order.taxPrice}</span>
              <hr />
              <span>Shipping $0</span>
              <hr />
              <span>Tax ${order.taxPrice}</span>
              <hr />
              <span>orderTotal ${order.totalPrice}</span>

              {!order.isPaid &&
                (isPending ? (
                  <Spinner />
                ) : (
                  <>
                    <PayPalButtons
                      className="paypal"
                      createOrder={createOrder}
                      onApprove={onApprove}
                      onerror={onError}></PayPalButtons>
                  </>
                ))}
              {payLoading && <Spinner />}
            </div>
          </div>
        </>
      )}
    </>
  );
};
export default OrderScreen;
