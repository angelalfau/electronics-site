import { React, useState } from "react";
import "./App.css";
import instance from "./components/axios";
// We use Route in order to define the different routes of our application
import { Route } from "react-router-dom";
import "./components/themes.css";
// We import all the components we need in our app
import Navbar from "./components/navbar";
import HomePage from "./components/homePage";
import BalancePage from "./components/balancePage";

const App = () => {
    const [themeDark, setThemeDark] = useState(false);
    const themeToggler = () => {
        themeDark ? setThemeDark(false) : setThemeDark(true);
    };

    return (
        <div id="body-background">
            <div class={themeDark ? "darkTheme" : "lightTheme"}>
                <Navbar themeToggler={themeToggler} themeDark={themeDark} />
                <Route exact path="/">
                    <HomePage />
                </Route>
                <Route exact path="/balance">
                    <BalancePage />
                </Route>
            </div>
        </div>
    );
};

export default App;
