import { React, useState } from "react";
import "./App.css";
import instance from "./components/axios";
import { Route } from "react-router-dom";
import "./components/themes.css";
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
                    <BalancePage themeDark={themeDark} />
                </Route>
            </div>
        </div>
    );
};

export default App;
