import React from "react";
import { useGlobalContext } from "./context";

const Product = () => {
  const { products } = useGlobalContext();

  return (
    <>
      {products &&
        products.map((currentProduct, index) => {
          console.log(currentProduct, "=====>");
          return (
            <div key={index}>
              <h2>Current Product</h2>
              <img
                src={currentProduct.image}
                alt=""
                style={{ width: "100px" }}
              />

              <h4>{currentProduct.title}</h4>
            </div>
          );
        })}
    </>
  );
};

export default Product;
