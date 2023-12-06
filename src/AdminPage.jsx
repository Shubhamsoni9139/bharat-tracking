import React, { useState } from 'react';
import { firestore } from './firebase';
import { doc, setDoc, getDoc } from 'firebase/firestore';

const AdminPage = () => {
  const [orderNo, setOrderNo] = useState('');
  const [selectedStage, setSelectedStage] = useState('');
  const [orderDate, setOrderDate] = useState('');
  const [expectedDeliveryDate, setExpectedDeliveryDate] = useState('');

  const stages = ["Confirm", "In Progress", "Packing", "Dispatch", "Delivered"];

  const generateDashString = (stage) => {
    const stageIndex = stages.indexOf(stage);
    return Array.from({ length: stageIndex + 1 }, (_, index) => stages[index]).join(' → ');
  };

  const generateProgressBar = () => (
    <div className="relative pt-1">
      <div className="flex items-center justify-between mb-2">
        {stages.map((stage, index) => (
          <div key={index} className={`text-xs text-center font-semibold w-1/5 ${index < stages.indexOf(selectedStage) ? 'text-teal-600' : 'text-gray-700'}`}>
            {stage}
          </div>
        ))}
      </div>
      <div className="flex items-center text-xs font-semibold py-1">
        {stages.map((stage, index) => (
          <div key={index} className={`flex items-center justify-center w-1/5 ${index <= stages.indexOf(selectedStage) ? 'bg-teal-500' : 'bg-gray-300'}`}>
            <span className={`block w-2 h-2 rounded-full ${index <= stages.indexOf(selectedStage) ? 'bg-teal-600' : 'bg-white'}`}></span>
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
      await setDoc(ordersCollection, {
        orderNo,
        stage: selectedStage,
        orderDate,
        expectedDeliveryDate,
      });
    } else {
      await setDoc(ordersCollection, {
        orderNo,
        stage: selectedStage,
        orderDate,
        expectedDeliveryDate,
      });
    }

    setOrderNo('');
    setSelectedStage('');
    setOrderDate('');
    setExpectedDeliveryDate('');
  };

  return (
    <div className="container mt-4">
      <div className="bg-yellow-100 p-6 rounded shadow mb-4">
        <h2 className="text-2xl font-bold mb-4">Admin Page</h2>
        <form onSubmit={handleSubmit}>
        <div className="mb-3">
            <label htmlFor="orderNo" className="block text-sm font-medium text-gray-700">
              Order Number:
            </label>
            <input
              type="text"
              id="orderNo"
              value={orderNo}
              onChange={(e) => setOrderNo(e.target.value)}
              className="mt-1 p-2 border rounded-md w-full bg-white"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="orderDate" className="block text-sm font-medium text-gray-700">
              Order Date:
            </label>
            <input
              type="date"
              id="orderDate"
              value={orderDate}
              onChange={(e) => setOrderDate(e.target.value)}
              className="mt-1 p-2 border rounded-md w-full bg-white"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="expectedDeliveryDate" className="block text-sm font-medium text-gray-700">
              Expected Delivery Date:
            </label>
            <input
              type="date"
              id="expectedDeliveryDate"
              value={expectedDeliveryDate}
              onChange={(e) => setExpectedDeliveryDate(e.target.value)}
              className="mt-1 p-2 border rounded-md w-full bg-white"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="selectStage" className="block text-sm font-medium text-gray-700">
              Select Stage:
            </label>
            <select
              id="selectStage"
              value={selectedStage}
              onChange={(e) => setSelectedStage(e.target.value)}
              className="mt-1 p-2 border rounded-md w-full bg-white"
            >
              <option value="">Select Stage</option>
              {stages.map((stage, index) => (
                <option key={index} value={stage}>
                  {stage}
                </option>
              ))}
            </select>
          </div>
          {selectedStage && (
            <div className="mb-3">
              <p className="font-semibold mb-2">Visual Representation:</p>
          
              <div className="mb-3">{generateProgressBar()}</div>
            </div>
          )}
          <button
            type="submit"
            className="bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminPage;
