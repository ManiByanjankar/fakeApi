import React from "react";
import { useParams } from "react-router-dom";

const FakeApi = () => {
  const { id } = useParams();
  return (
    <>
      <div>OUR FAKE API {id}</div>
    </>
  );
};

export default FakeApi;
