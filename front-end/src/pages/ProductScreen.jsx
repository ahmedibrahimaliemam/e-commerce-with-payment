import { useNavigate, useParams } from "react-router-dom";
import Rating from "../smComponent/Rating";
import { useEffect, useState } from "react";
import axios from "axios";
import Spinner from "../smComponent/Spinner";
import "./productScreen.css";
import { Helmet } from "react-helmet-async";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../rtk/slices/productSlice";

const ProductScreen = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const productState = useSelector((state) => state.product);
  const [thisProduct, setThisProduct] = useState({});
  const [Loading, setLoading] = useState(false);
  const [error, setErr] = useState(false);
  const navigate = useNavigate();
  const getThisProduct = async () => {
    setLoading(true);
    await axios
      .get(`http://localhost:5000/products/api/${id}`)
      .then((res) => {
        setLoading(false);
        setThisProduct(res.data.data);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
        setErr(true);
      });
  };
  useEffect(() => {
    getThisProduct();
    console.log(productState);
  }, [id, dispatch]);
  return (
    <div className="product-screen">
      {Loading ? (
        <Spinner />
      ) : error ? (
        <div>error</div>
      ) : (
        <>
          <div className="product-screen-image">
            <img src={thisProduct.image} alt={thisProduct.description} />
          </div>
          <Helmet>
            <title>{thisProduct.name}</title>
          </Helmet>
          <div className="product-screen-content-1">
            <h1 className="slug py-2">{thisProduct.slug}</h1>
            <hr />
            <span className="inline-block py-2">
              <Rating
                stars={thisProduct.rating}
                numReviews={thisProduct.numReviews}
              />
            </span>
            <hr />
            <span className="inline-block py-2">
              price:{" "}
              <small className="bg-slate-900 text-white p-2">
                ${thisProduct.price}
              </small>
            </span>
            <hr />
            <span className="inline-block py-2">
              description:{" "}
              <p className="inline-block font-bold">
                {thisProduct.description}
              </p>
            </span>
          </div>
          <div className="product-screen-content-2">
            <span className="inline-block py-3">
              price:{" "}
              <small className="bg-slate-900 text-white p-2">
                ${thisProduct.price}
              </small>
            </span>
            <hr />
            <span>
              status:{" "}
              {thisProduct.countInStock > 0 ? (
                <>
                  <span className="inline-flex items-center rounded-md bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20">
                    available
                  </span>
                  <hr className="mt-5" />
                  <button
                    onClick={() => {
                      dispatch(addToCart(thisProduct));
                      navigate("/products/cart");
                    }}
                    className="btn">
                    Add to cart
                  </button>
                </>
              ) : (
                <span className="inline-flex items-center rounded-md bg-red-50 px-2 py-1 text-xs font-medium text-red-700 ring-1 ring-inset ring-red-600/10">
                  unavailable
                </span>
              )}
            </span>
          </div>
        </>
      )}
    </div>
  );
};
export default ProductScreen;
