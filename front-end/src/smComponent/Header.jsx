import {  useState } from "react";
import "./header.css";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { removeUser } from "../rtk/slices/usersSlice";
import { clearCart } from "../rtk/slices/productSlice";
import { removeUserInfo } from "../rtk/slices/userInfoSlice";
import SideBar from "./sideBar";
import { sideBarCon } from "../rtk/slices/SideBarSlice";
import { removeSearch, search } from "../rtk/slices/searchSlice"


const Header = () => {
  const productsInCart = useSelector((state) => state.product);
  const userState = useSelector((state) => state.users);
  const [dropDown, setDropDown] = useState(false);
  const dispatch = useDispatch();
  const sideBar=useSelector((state)=>state.sideBar) ;
  const products=useSelector((state)=>state.allProducts) ;
  const [getSearch,setSearch]=useState("") ;
  console.log(sideBar);
  console.log(userState);
  //handle dropdown
  const handlDropDown = () => {
    if (!dropDown) setDropDown(true);
    else setDropDown(false);
  };
  //handle sidebar
  const sideHandler=()=>{
    if(sideBar){
      dispatch(sideBarCon(false)) ;
    }
    else{
      dispatch(sideBarCon(true)) ;
    }
  
 
  }
  //handle search
  const handleSearch=()=>{
    for(let i=0 ; i<products.length ; i++){
      if(products[i].name.includes(getSearch)){
        dispatch(search(products[i])) ;
      }
     
      

    }



  }

  
  
  return (
    <>
      <header
        onClick={() => {
          dropDown ? setDropDown(false)  : null;
        }}>
        <div className="first-side">
          <i
            onClick={sideHandler}
            className="fa-solid fa-bars fa-2x text-white"></i>
          <Link onClick={()=>dispatch(removeSearch())} className="log text-2xl" to={"/"}>
            amazon
          </Link>
          <input
            type="text"
            className="px-1 relative overflow-hidden outline-none	"
            onChange={(e)=>{setSearch(e.target.value)
              dispatch(removeSearch())
            }}
          />
          <i onClick={handleSearch}  className="fa-solid fa-magnifying-glass search-icon"></i>
        </div>

        <div className="left">
          <Link to={"products/cart"}>
            <i  className="fa-solid fa-cart-shopping fa-2x">
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
                      <Link to={`/profile`}>User profile</Link>
                    </li>
                    <li>
                      <Link to={`/orderhistory`}>Order history</Link>
                    </li>
                    <hr />
                    <li>
                      <Link
                        to={"/signIn"}
                        onClick={() => {
                          dispatch(removeUser());
                          dispatch(clearCart());
                          dispatch(removeUserInfo());
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
        </div>
      </header>
      <SideBar sideAppearing={sideBar} />
    </>
  );
};
export default Header;
