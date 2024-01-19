import React from "react";
import Home from "./Home";
import { Routes, Route } from "react-router-dom";
import FakeStore from "./FakeApi";

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/fakeapi/:id" element={<FakeStore />}></Route>
        <Route path="*">"NOT FOUND"</Route>
      </Routes>
    </>
  );
};

export default App;
