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

  function calculatePagination(pageNumber, limit) {
    // Ensure page number is a positive integer
    const pageNumbers = Math.max(1, Math.floor(pageNumber));
    console.log("FUNCTION page number", pageNumbers);

    console.log("FUNCTION page number", pageNumbers);
    // Calculate start and end indices
    const start = (page - 1) * limit;
    const end = start + limit;

    return { start, end, pageNumbers };
  }

  const getFakeApi = async (url, limit) => {
    try {
      console.log("sfgsdfgsdf", `${url}${limit}`);
      const res = await axios.get(`${url}${limit}`);
      const data = res.data;
      return data;
    } catch (error) {
      console.log(error);
    }
  };

  const handlePageChange = (updatedPage) => {
    setPage(updatedPage);
    console.log(page, "<====>");
    console.log(`${API_URL}${page * nbpages}`);
    //  getFakeApi(`${API_URL}`, `${page * nbpages}`);
  };

  useEffect(() => {
    //fetch all data from api and filter only the required data in a page
    async function fetchData() {
      const data = await getFakeApi(`${API_URL}`, `${page * nbpages}`);
      if (data) {
        console.log(data, "++++++>BEFORE SLICE");
        const { start, end } = calculatePagination(page, nbpages);
        let slicedData = data.slice(start, end);
        console.log("SLICE FROM", start, end);
        console.log(slicedData, "++++++++>AFTER SLICE");
        setProducts(slicedData);
        setIsLoading(false);
      } else {
        setIsError({ show: true, msg: "data.error" });
      }
    }
    fetchData();
  }, [page]);

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
