import React from 'react';
import ReactDOM from 'react-dom/client';
import App from "./App";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { store } from "./store/index";
import { createTheme } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";

import "./index.css";
import ScrollToTop from "./components/scroll-to-top/ScrollToTop";
import * as serviceWorkerRegistration from './serviceWorkerRegistration';
import reportWebVitals from './reportWebVitals';

const theme = createTheme({
    palette: {
        primary: {
            main: "#2C2125",
        },
    },
});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <BrowserRouter>
        <Provider store={store}>
            <ThemeProvider theme={theme}>
                <ScrollToTop />
                <App />
            </ThemeProvider>
        </Provider>
    </BrowserRouter>
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorkerRegistration.unregister();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
