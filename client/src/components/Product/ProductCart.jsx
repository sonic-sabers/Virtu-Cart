import React, { memo, useState } from "react";

const ProductCart = memo(
  ({ id, title, thumbnail, price, description, handleAddToCart }) => {
    const [showImage, setShowImage] = useState(true);
    return (
      <div key={id} className="m-4 sm:max-w-xs rounded shadow-lg relative">
        <h1
          className="z-10 p-3 text-4xl font-bold text-indigo-800 hover:text-indigo-600 absolute top-0 left-0"
          onClick={() => setShowImage(!showImage)}
        >
          {title}
        </h1>
        <div
          style={{ width: "320px", height: "400px" }}
          className="relative bg-gray-100"
        >
          {showImage ? (
            <img src={thumbnail} alt={title} className="absolute z-0" />
          ) : (
            <div
              style={{ width: "320px", height: "250px", top: "150px" }}
              className="absolute bg-indigo-900 text-white p-2"
            >
              {description}
            </div>
          )}
        </div>
        <div className="w-full text-white bg-indigo-900 p-4 flex justify-between content-center">
          <button
            className="border-white font-bold border-2 px-4 rounded-full hover:bg-white hover:text-indigo-900">
            Add To Cart
          </button>
          <span className="p-2 text-xl">Rs. {price}</span>
        </div>
      </div>
    );
  }
);

export default ProductCart;
