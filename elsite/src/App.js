import { React, useState } from "react";
import "./App.css";
import { Route } from "react-router-dom";
import "./components/themes.css";
import Navbar from "./components/navbar";
import SignupPage from "./components/signupPage";
import BalancePage from "./components/balancePage";
import LaunchLink from "./components/LaunchLink.tsx";
import HomePage from "./components/homePage";

const App = () => {
    // get token from local storage
    // check if token exists, if so set user with action
    //

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
                <Route exact path="/signup">
                    <SignupPage />
                </Route>
                <Route exact path="/balance">
                    <BalancePage themeDark={themeDark} />
                </Route>
                <Route exact path="/link">
                    <LaunchLink themeDark={themeDark} />
                </Route>
            </div>
        </div>
    );
};

export default App;
