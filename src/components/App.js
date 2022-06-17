import React from "react";
import "../styles/App.css";
import Layout from "./Layout";
import Home from "./pages/Home";

const App = () => {
  return (
    <>
      <Layout>
        <Home />
      </Layout>
    </>
  );
};

export default App;
