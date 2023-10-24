import { Link } from "react-router-dom";
import Rating from "../smComponent/Rating";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../rtk/slices/productSlice";
import { sideBarCon } from "../rtk/slices/SideBarSlice";
import { search } from "../rtk/slices/searchSlice";
import { addAllProducts } from "../rtk/slices/AllProductSlice";
const Products = (props) => {
  const dispatch = useDispatch();
  const productsState = useSelector((state) => state.product);
  const usersState = useSelector((state) => state.users);

  const { products } = props;
  //dispatch((addAllProducts(products)))
  const addToCartHandler = (product) => {
    dispatch(addToCart(product));
  };

  //manage local storage to save items in the cart if refresh page
  localStorage.setItem("products", JSON.stringify(productsState));

  //check if product out of stock
  const findProductOutOfStock = (product) => {
    const found = productsState.find((ele) => ele._id === product._id);
    if (found) {
      if (found.quantity == found.countInStock) {
        return true;
      }
    } else {
      return false;
    }
  };
  const searchState=useSelector((state)=>state.search) ;
  //handle showing products
  var searchProduct=[];
  if(searchState.length){
    searchProduct=searchState ;
  }
  else{
    searchProduct=products ;
  }

  return (
    <div
      onClick={() => {
        dispatch(sideBarCon(false));
      }}
      className="products">
      {searchProduct.map((product, index) => (
        <div key={Math.random()} className="product text-center">
          <Link to={`products/${product._id}`}>
            <div className="image-container">
              <img src={product.image} alt={product.name} />
            </div>
          </Link>
          <div className="product-content">
            <Link to={`products/${product._id}`}>
              <p className="product-name">{product.name}</p>
            </Link>
            <p>
              <strong>${product.price}</strong>
            </p>
            <Rating stars={product.rating} numReviews={product.numReviews} />
            <button
              className="btn"
              onClick={() => {
                addToCartHandler(product);
              }}
              style={findProductOutOfStock(product) ? { display: "none" } : {}}>
              Add To Cart
            </button>
            <p
              style={findProductOutOfStock(product) ? {} : { display: "none" }}>
              out of stock
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};
export default Products;
