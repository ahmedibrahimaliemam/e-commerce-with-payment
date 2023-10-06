const PaymentLine=(props)=>{
    const {active , num}=props ;
    return(
        <>
          <div className="shipping-ele">
        <p className={active}>sign-in</p>
        <p className={active}>shipping</p>
        <p>payment</p>
        <p>place order</p>
      </div>
      <div className={`horizontal-parent`}>
        <span className={`horizontal-${num}`}></span>
      </div>
        </>
    )
}
export default PaymentLine ;