import { Helmet } from "react-helmet-async";
import PaymentLine from "../smComponent/paymentLine";
import "./payment.css";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { addPayment } from "../rtk/slices/paymentSlice";

const Payment = () => {
  const paymentState = useSelector((state) => state.payment);
  const [paymentMethod, setPaymentMethod] = useState(
    paymentState.paymentMethod || "paypal"
  );
  const navigate = useNavigate();
  const userInfoState = useSelector((state) => state.userInfo);
  const dispatch = useDispatch();
  const submitHandler = (e) => {
    e.preventDefault();
    if (paymentMethod) {
      dispatch(addPayment({ paymentMethod }));
      navigate("/placeorder");
    } else {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "please choose the payment method!",
      });
    }
  };
  useEffect(() => {
    if (!userInfoState.address) {
      navigate("/shipping");
    }
  }, []);
  return (
    <>
      <Helmet>
        <title>Payment Screen</title>
      </Helmet>
      <PaymentLine active1="active-1" active="active" num="1" />
      <form onSubmit={submitHandler} className="payment-container">
        <h1>Payment Method</h1>
        <label htmlFor="paypal">
          PayPal
          <input
            type="radio"
            onChange={(e) => setPaymentMethod(e.target.value)}
            id="paypal"
            name="sameName"
            value="paypal"
            checked={paymentMethod === "paypal"}
          />
        </label>
        <label htmlFor="stripe">
          Stripe
          <input
            type="radio"
            onChange={(e) => setPaymentMethod(e.target.value)}
            checked={paymentMethod === "stripe"}
            id="stripe"
            name="sameName"
            value="stripe"
          />
        </label>
        <button onClick={submitHandler} className="btn btn-dodger">
          continue
        </button>
      </form>
    </>
  );
};
export default Payment;
