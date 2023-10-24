import "./shipping.css";
import { Link, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { svaUserInfo } from "../rtk/slices/userInfoSlice";
import PaymentLine from "../smComponent/paymentLine";
import Swal from "sweetalert2";
const Shipping = () => {
  const userInfoState = useSelector((state) => state.userInfo);
  const userState = useSelector((state) => state.users);
  const navigate = useNavigate();
  const [name, setName] = useState(userInfoState.name || "");
  const [city, setCity] = useState(userInfoState.city || "");
  const [address, setAddress] = useState(userInfoState.address || "");
  const [postalNum, setPostalNum] = useState(userInfoState.postalNum || "");
  const [country, setCountry] = useState(userInfoState.country || "");
  const dispatch = useDispatch();
  const submitHandler = (e) => {
    e.preventDefault();
    if (name && city && address && postalNum && country) {
      dispatch(
        svaUserInfo({
          name,
          city,
          address,
          postalNum,
          country,
        })
      );
      navigate("/payment");
    } else {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "you must fill all data!",
      });
    }
  };
  useEffect(() => {
    if (!userState.name) {
      navigate("/signIn?redirect=/shipping");
    }
  }, []);
  return (
    <>
      <PaymentLine active="active" num="0" />
      <Helmet>
        <title>shipping</title>
      </Helmet>
      <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="mt-2 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Shipping Address
          </h2>
        </div>

        <div className="mt-2 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6" onSubmit={submitHandler}>
            <div>
              <label
                htmlFor="fullName"
                className="block text-sm font-medium leading-6 text-gray-900">
                Full Name
              </label>
              <div className="mt-2">
                <input
                  onChange={(e) => setName(e.target.value)}
                  defaultValue={userInfoState.name}
                  id="fullName"
                  name="fullName"
                  type="text"
                  autoComplete="text"
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="Address"
                  className="block text-sm font-medium leading-6 text-gray-900">
                  Address
                </label>
              </div>
              <div className="mt-2">
                <input
                  onChange={(e) => {
                    setAddress(e.target.value);
                  }}
                  defaultValue={userInfoState.address}
                  id="Address"
                  name="Address"
                  type="text"
                  autoComplete="text"
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            <div>
              <label
                htmlFor="city"
                className="block text-sm font-medium leading-6 text-gray-900">
                City
              </label>
              <div className="mt-2">
                <input
                  onChange={(e) => setCity(e.target.value)}
                  defaultValue={userInfoState.city}
                  id="city"
                  name="city"
                  type="text"
                  autoComplete="text"
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            <div>
              <label
                htmlFor="postalCode"
                className="block text-sm font-medium leading-6 text-gray-900">
                postalCode
              </label>
              <div className="mt-2">
                <input
                  onChange={(e) => setPostalNum(e.target.value)}
                  defaultValue={userInfoState.postalNum}
                  id="postalCode"
                  name="postalCode"
                  type="text"
                  autoComplete="text"
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            <div>
              <label
                htmlFor="country"
                className="block text-sm font-medium leading-6 text-gray-900">
                country
              </label>
              <div className="mt-2">
                <input
                  defaultValue={userInfoState.country}
                  onChange={(e) => setCountry(e.target.value)}
                  id="country"
                  name="country"
                  type="text"
                  autoComplete="text"
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-yellow-300 px-3 py-1.5 text-sm font-semibold leading-6 text-black shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                continue
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};
export default Shipping;
