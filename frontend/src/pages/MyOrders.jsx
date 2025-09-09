import { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/Context";
import toast from "react-hot-toast";

const MyOrders = () => {
  const [myOrders, setMyOrders] = useState([]);
  const { axios, user } = useContext(AppContext);
  const fetchOrders = async () => {
    try {
      const { data } = await axios.get("/order/userOrder");
      console.log(data)
      if (data.success) {
        setMyOrders(data.orders);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    if (user) {
      fetchOrders();
    }
  }, [user]);
  return (
    <div className="mt-12 pb-16">
      <div>
        <p className="text-2xl md:text-3xl font-medium">My Orders</p>
      </div>

      {myOrders.map((order, index) => (
        <div
          key={index}
          className="my-8 border border-gray-300 rounded-lg mb-10 p-4 py-5 max-w-5xl"
        >
          <p className="flex justify-between items-center gap-6 text-red-500 ">
            <span>orderId :{order._id} </span>
            <span>payment :{order.paymentType} </span>
            <span>Total Amount :${order.amount} </span>
          </p>
          {order.items.map((item, index) => (
            <div
              key={index}
              className={`relative bg-white text-black ${
                order.items.length !== index + 1 && "border-b"
              } border-gray-300 flex flex-col md:flex-row md:items-center  justify-between p-4 py-5 w-full max-w-5xl`}
            >
              <div className="flex items-center mb-4 md:mb-0 w-xl">
                <div className="p-4 rounded-lg">
                  <img
                    src={item.product.images?.[0]}
                    alt=""
                    className="w-16 h-16"
                  />
                </div>

                <div className="mx-3">
                  <h2 className="text-lg font-medium line-clamp-2">{item.product.name}<span className={`text-blue-500 text-xs ${ item.quantity < 2 && "hidden" }`}>  x {item.quantity}</span></h2>
                  <p className="text-blue-600 text-sm">{item.product.category}</p>
                </div>
              </div>

              <div className=" text-sm font-medium mx-1 w-52">
                <p>Status: <span className={` ${order.status === 'delivered' ?'text-green-500':order.status === 'out for delivery'?"text-orange-500":"text-blue-700"}`}> {order.status}</span></p>
                <p className="text-gray-600 text-xs">Date:{new Date(order.createdAt).toLocaleString()}</p>
              </div>
              <p className=" text-lg text-blue-600">
                Amount:${item.product.offerPrice * item.quantity}
              </p>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};
export default MyOrders;