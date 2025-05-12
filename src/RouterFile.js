import React from "react";
import { Route, Routes } from "react-router-dom";
import FormContainer from "./components/FormContainer";
import PortfolioHome from "./PortfolioHome/PortfolioHome";
import ViewContainer from "./components/ViewContainer";
import App from "./App";

function RouterFile() {
  return (
    <Routes>
      <Route path="/" element={<App />}></Route>
      <Route path="/form" element={<FormContainer />}></Route>
      <Route path="/portfolio" element={<PortfolioHome />}></Route>
      <Route path="/view" element={<ViewContainer />}></Route>
    </Routes>
  );
}

export default RouterFile;
