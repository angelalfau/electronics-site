import { React, useState } from "react";
import "./App.css";
import instance from "./components/axios";
// We use Route in order to define the different routes of our application
import { Route } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import { GlobalStyles } from "./components/globalStyles";
import { lightTheme, darkTheme } from "./components/Themes";
// We import all the components we need in our app
import Navbar from "./components/navbar";
import HomePage from "./components/homePage";
import TransactionPage from "./components/transactionPage";

const App = () => {
    const [themeDark, setThemeDark] = useState(false);
    const themeToggler = () => {
        themeDark ? setThemeDark(false) : setThemeDark(true);
    };

    return (
        <ThemeProvider theme={themeDark ? darkTheme : lightTheme}>
            <>
                <GlobalStyles />
                <div>
                    <Navbar themeToggler={themeToggler} themeDark={themeDark} />
                    <Route exact path="/">
                        <HomePage />
                    </Route>
                    <Route path="/transactions">
                        <TransactionPage />
                    </Route>
                </div>
            </>
        </ThemeProvider>
    );
};

export default App;
