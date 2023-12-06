import React from "react";
import { FaClipboardList, FaBoxOpen, FaShippingFast, FaHome } from "react-icons/fa";

export default function Example() {
  return (
    <>
      <section className="h-screen flex items-center justify-center bg-indigo-700">
        <div className="container mx-auto">
          <div className="w-full max-w-lg mx-auto">
            <div className="bg-white p-8 rounded-lg shadow-lg">
              <div className="flex justify-between items-center mb-5">
                <div>
                  <h5 className="text-2xl font-bold">INVOICE <span className="text-primary font-bold">#Y34XDHR</span></h5>
                </div>
                <div className="text-end">
                  <p className="mb-0">Expected Arrival <span>01/12/19</span></p>
                  <p className="mb-0">USPS <span className="font-bold">234094567242423422898</span></p>
                </div>
              </div>

              <ul className="flex justify-between mx-0 mt-0 mb-5 px-0 pt-0 pb-2" id="progressbar-2">
                <li className="step active"></li>
                <li className="step active"></li>
                <li className="step active"></li>
                <li className="step"></li>
              </ul>

              <div className="flex justify-between">
                <div className="flex items-center">
                  <FaClipboardList className="text-3xl me-4 mb-3" />
                  <div>
                    <p className="font-bold mb-1">Order</p>
                    <p className="font-bold mb-0">Processed</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <FaBoxOpen className="text-3xl me-4 mb-3" />
                  <div>
                    <p className="font-bold mb-1">Order</p>
                    <p className="font-bold mb-0">Shipped</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <FaShippingFast className="text-3xl me-4 mb-3" />
                  <div>
                    <p className="font-bold mb-1">Order</p>
                    <p className="font-bold mb-0">En Route</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <FaHome className="text-3xl me-4 mb-3" />
                  <div>
                    <p className="font-bold mb-1">Order</p>
                    <p className="font-bold mb-0">Arrived</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
