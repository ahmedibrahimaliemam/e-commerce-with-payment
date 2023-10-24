import axios from "axios";
import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { useSelector } from "react-redux";
import Spinner from "../smComponent/Spinner";
import { useNavigate } from "react-router-dom";

const OrderHistory = () => {
  const [loading, setLoading] = useState(false);
  const [allOrders, setAllOrders] = useState([]);
  const userState = useSelector((state) => state.users);
  const navigate = useNavigate();
  const fetchOrders = async () => {
    setLoading(true);
    await axios
      .get(`http://localhost:5000/order/api/mine/${userState._id}`, {
        headers: {
          authorization: `Bearer ${userState.token}`,
        },
      })
      .then((res) => {
        setLoading(false);
        console.log(res.data);
        setAllOrders(res.data);
      })
      .catch((err) => {
        console.log(`error`);
        setLoading(false);
        console.log(err);
      });
  };
  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <>
      <Helmet>
        <title>Order history</title>
      </Helmet>
      <h1 className="text-center font-bold text-3xl my-5">order history</h1>
      <div className="relative overflow-x-auto">
        {loading ? (
          <Spinner />
        ) : (
          <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3">
                  ID
                </th>
                <th scope="col" className="px-6 py-3">
                  Date
                </th>
                <th scope="col" className="px-6 py-3">
                  total
                </th>
                <th scope="col" className="px-6 py-3">
                  Paid
                </th>
                <th scope="col" className="px-6 py-3">
                  Delivered
                </th>
                <th scope="col" className="px-6 py-3">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {allOrders.map((ele) => (
                <>
                  <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                    <th
                      scope="row"
                      className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                      {ele._id}
                    </th>
                    <td className="px-6 py-4">{ele.createdAt}</td>
                    <td className="px-6 py-4">${ele.totalPrice}</td>
                    <td className="px-6 py-4">{ele.isPaid ? "Yes" : "No"}</td>
                    <td className="px-6 py-4">
                      {ele.isDelivered ? "Yes" : "No"}
                    </td>
                    <td className="px-6 py-4">
                      <button
                        className="btn"
                        onClick={() => {
                          navigate(`/placeorder/${ele._id}`);
                        }}>
                        Details
                      </button>
                    </td>
                  </tr>
                </>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </>
  );
};
export default OrderHistory;
