const PaymentLine = (props) => {
  const { active, active1, active2, num } = props;
  return (
    <>
      <div className="shipping-ele">
        <p className={active||active1||active2}>sign-in</p>
        <p className={active||active1||active2}>shipping</p>
        <p className={active1||active2}>payment</p>
        <p className={active2}>place order</p>
      </div>
      <div className={`horizontal-parent`}>
        <span className={`horizontal-${num}`}></span>
      </div>
    </>
  );
};
export default PaymentLine;
