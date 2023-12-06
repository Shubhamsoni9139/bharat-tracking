import React, { useState } from 'react';
import { firestore } from './firebase';
import { doc, getDoc } from 'firebase/firestore';

const UserPage = () => {
  const [orderNo, setOrderNo] = useState('');
  const [status, setStatus] = useState('');
  const [orderDate, setOrderDate] = useState('');
  const [expectedDeliveryDate, setExpectedDeliveryDate] = useState('');

  const stages = ["Confirm", "In Progress", "Packing", "Dispatch", "Delivered"];

  const getProgressPercentage = () => {
    if (status === 'Delivered') {
      return 100;
    }
    const stageIndex = stages.indexOf(status) + 1;
    return (stageIndex / stages.length) * 100;
  };

  const generateProgressBar = () => (
    <div className="relative pt-1">
      <div className="flex items-center justify-between mb-2">
        {stages.map((stage, index) => (
          <div key={index} className={`text-xs text-center font-semibold w-1/5 ${index < stages.indexOf(status) ? 'text-teal-600' : 'text-gray-700'}`}>
            {stage}
          </div>
        ))}
      </div>
      <div className="flex items-center text-xs font-semibold py-1">
        {stages.map((stage, index) => (
          <div key={index} className={`flex items-center justify-center w-1/5 ${index <= stages.indexOf(status) ? 'bg-teal-500' : 'bg-gray-300'}`}>
            <span className={`block w-2 h-2 rounded-full ${index <= stages.indexOf(status) ? 'bg-teal-600' : 'bg-white'}`}></span>
          </div>
        ))}
      </div>
    </div>
  );
  


  const handleSubmit = async (e) => {
    e.preventDefault();

    const ordersCollection = doc(firestore, 'orders', orderNo);
    const orderDocSnapshot = await getDoc(ordersCollection);

    if (orderDocSnapshot.exists()) {
      const data = orderDocSnapshot.data();
      setStatus(data.stage);
      setOrderDate(data.orderDate || '');
      setExpectedDeliveryDate(data.expectedDeliveryDate || '');
    } else {
      setStatus('Order not found');
      setOrderDate('');
      setExpectedDeliveryDate('');
    }
  };

  return (
    <div>
      {/* Navbar */}
      <nav className="bg-white shadow">
        <div className="container mx-auto p-4 flex justify-between items-center">
          <img
            src="https://res.cloudinary.com/dt8emxboh/image/upload/v1701267143/kpxmttc2sbhyhxwcurx4.jpg"
            alt="Logo"
            width="80"
            height="50"
            className="d-inline-block align-top"
          />
          <span className="text-xl font-semibold">Order Tracker</span>
        </div>
      </nav>

      {/* UserPage Content */}
      <div className="container mt-4">
        <div className="bg-blue-100 p-6 rounded shadow">
          <h2 className="text-2xl font-bold mb-4">Track your order here</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4 bg-yellow-100">
              <label htmlFor="orderNo" className="block text-sm font-medium text-gray-700">
                Order Number:
              </label>
              <input
                type="text"
                id="orderNo"
                value={orderNo}
                onChange={(e) => setOrderNo(e.target.value)}
                className="mt-1 p-2 border rounded-md w-full bg-yellow-100"
              />
            </div>
            <button
              type="submit"
              className="bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600"
            >
              Check Status
            </button>
          </form>
          <div className={`mt-4 p-3 rounded bg-yellow-100 ${status ? '' : 'bg-yellow-100'}`}>
            <p className="font-semibold bg-yellow-100">Status:</p>
            {status || 'Order not found'}
          </div>
          {status && status !== 'Order not found' && (
            <div className="mt-4 bg-light p-3 rounded bg-yellow-100">
              <p className="font-semibold">Visual Representation:</p>
              {generateProgressBar()}
            </div>
          )}
          {orderDate && (
            <div className="mt-4 bg-light p-3 rounded bg-yellow-100">
              <p className="font-semibold">Order Date:</p>
              {orderDate}
            </div>
          )}
          {expectedDeliveryDate && (
            <div className="mt-4 bg-light p-3 rounded bg-yellow-100">
              <p className="font-semibold">Expected Delivery Date:</p>
              {expectedDeliveryDate}
            </div>
          )}
          {orderNo && (
            <div className="mt-4 bg-light text-black p-3 rounded bg-yellow-100">
              <p className="font-semibold">Order No:</p>
              {orderNo}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserPage;
