import { useContext, useState } from "react";
import "./header.css";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { removeUser } from "../rtk/slices/usersSlice";
import { clearCart } from "../rtk/slices/productSlice";
import { removeUserInfo } from "../rtk/slices/userInfoSlice";

const Header = () => {
  const productsInCart = useSelector((state) => state.product);
  const userState = useSelector((state) => state.users);
  const [dropDown, setDropDown] = useState(false);
  const dispatch = useDispatch();
  console.log(userState);
  const handlDropDown = () => {
    if (!dropDown) setDropDown(true);
    else setDropDown(false);
  };
  return (
    <header
      onClick={() => {
        dropDown ? setDropDown(false) : null;
      }}>
      <Link to={""}>amazon</Link>
      <Link to={"products/cart"}>
        <i className="fa-solid fa-cart-shopping fa-2x">
          <small>{productsInCart.length}</small>
        </i>
      </Link>
      {userState.name ? (
        <>
          <button onClick={handlDropDown}>
            {userState.name}
            <i className="fa-sharp fa-solid fa-caret-down pl-2"></i>
            {dropDown ? (
              <ul className="drop-down">
                <li>
                  <Link>User profile</Link>
                </li>
                <li>
                  <Link>Order history</Link>
                </li>
                <hr />
                <li>
                  <Link
                    to={"/signIn"}
                    onClick={() => {
                      dispatch(removeUser());
                      dispatch(clearCart());
                      dispatch(removeUserInfo()) ;
                    }}>
                    sign out
                  </Link>
                </li>
              </ul>
            ) : null}
          </button>
        </>
      ) : (
        <Link to={"/signin"}>sign in</Link>
      )}
    </header>
  );
};
export default Header;
