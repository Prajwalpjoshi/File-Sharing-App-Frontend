import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { ChakraProvider } from "@chakra-ui/react";
import FileProvider from "./Context/FileProvider";
import { BrowserRouter } from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <FileProvider>
      <ChakraProvider>
        <App />
      </ChakraProvider>
    </FileProvider>
  </BrowserRouter>
);
