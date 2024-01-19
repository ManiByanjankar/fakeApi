import React, { useContext, useEffect, useState } from "react";
import axios from "axios";

const API_URL = `https://fakestoreapi.com/products?limit=`;

// const totalProducts = 20; // replace with the actual total number of products
// const productsPerPage = 5;
// const total_pages = Math.ceil(totalProducts / productsPerPage);

const AppContext = React.createContext();

const AppProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [products, setProducts] = useState([]);
  const [isError, setIsError] = useState({ show: false, msg: "" });
  const [page, setPage] = useState(1);

  const nbpages = 5;

  const getFakeApi = async (url, limit) => {
    try {
      console.log("sfgsdfgsdf", `${url}${limit}`);
      const res = await axios.get(`${url}${limit}`);
      const data = res.data;
      console.log(data, "++++++++>");
      if (data) {
        setProducts(data);
        setIsLoading(false);
      } else {
        setIsError({ show: true, msg: "data.error" });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handlePageChange = (newPage) => {
    setPage(newPage);
    console.log(`${API_URL}${newPage * nbpages}`);
    getFakeApi(`${API_URL}`, `${newPage * nbpages}`);
  };

  useEffect(() => {
    getFakeApi(API_URL, nbpages);
  }, [nbpages]);
  return (
    <AppContext.Provider
      value={{ isLoading, isError, products, page, nbpages, handlePageChange }}>
      {children}
    </AppContext.Provider>
  );
};

//global custom hooks

const useGlobalContext = () => {
  return useContext(AppContext);
};

export { AppContext, AppProvider, useGlobalContext };
