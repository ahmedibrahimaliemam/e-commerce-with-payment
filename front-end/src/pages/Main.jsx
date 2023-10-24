import { useContext, useEffect, useState } from "react";
import data from "../../public/data";
import "./main.css";
import { Link } from "react-router-dom";
import axios from "axios";
import Spinner from "../smComponent/Spinner";
import Products from "./products";
import { Helmet } from "react-helmet-async";
import { useDispatch } from "react-redux";

const Main = () => {
  const [products, setProducts] = useState([]);
  const [Loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const dispatch = useDispatch();
  const getAllProducts = async () => {
    setLoading(true);
    await axios
      .get("http://localhost:5000/products/api")
      .then((res) => {
        setLoading(false);
        setProducts(res.data.data);
      })
      .catch((err) => {
        setLoading(false);
        setError(true);
      });
  };
  useEffect(() => {
    getAllProducts();
  }, []);

  return (
    <main className=" pd-y ">
      <Helmet>
        <title>amazon</title>
      </Helmet>
      <h1 className="main-title">Featured products</h1>
      {Loading ? (
        <Spinner />
      ) : error ? (
        <h1 style={{ textAlign: "center", fontSize: "2rem" }}>
          data not found try again!
        </h1>
      ) : (
        <Products products={products} />
      )}
    </main>
  );
};
export default Main;
