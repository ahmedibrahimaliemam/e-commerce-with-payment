import { Link } from "react-router-dom";
import "./sideBar.css";
import { useDispatch } from "react-redux";
import { sideBarCon } from "../rtk/slices/SideBarSlice";

const SideBar = (props) => {
  const { sideAppearing } = props;
  const dispatch=useDispatch() ;
  console.log(sideAppearing);
  return (
    <>
      
        <div onClick={()=>{dispatch(sideBarCon(false))}} style={sideAppearing?{left:"0"}:{}} className="side-bar">
          <h1 className="text-2xl p-2">Categories</h1>
          <Link className="p-4">Pants</Link>
          <Link className="p-4">Shirts</Link>
        </div>
      
    </>
  );
};
export default SideBar;
