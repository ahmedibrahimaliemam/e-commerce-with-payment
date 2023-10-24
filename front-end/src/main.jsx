import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import "./App.css";
import { HelmetProvider } from "react-helmet-async";
import { Provider } from "react-redux";
import store from "./rtk/store.jsx";
import {PayPalScriptProvider} from "@paypal/react-paypal-js"

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <HelmetProvider>
        <Provider store={store}>
          <PayPalScriptProvider deferLoading={true}>
            <App />
          </PayPalScriptProvider>
        </Provider>
      </HelmetProvider>
    </BrowserRouter>
  </React.StrictMode>
);
