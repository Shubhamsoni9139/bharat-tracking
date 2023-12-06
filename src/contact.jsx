import React from 'react';

const Contact = () => {
  return (
    <div className="container mt-4 text-center">
      <h2 className="text-2xl font-bold mb-4">Contact Information</h2>
      <div className="mb-4">
        <p>If you have any questions or concerns regarding your order, feel free to contact our customer support team:</p>
      </div>
      <div className="flex flex-col items-start mb-4">
        <p className="font-semibold">Customer Support:</p>
        <p>Email: <a href="mailto:giftingmemories@gmail.com" className="text-blue-500">giftingmemories@gmail.com</a></p>
        <p>Phone: <a href="tel:+917240401110" className="text-blue-500">+91 72404 01110</a></p>
      </div>
    </div>
  );
};

export default Contact;
