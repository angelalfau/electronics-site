import { React, useState } from "react";
import "./App.css";
import axios from "axios";
// We use Route in order to define the different routes of our application
import { Route } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import { GlobalStyles } from "./components/globalStyles";
import { lightTheme, darkTheme } from "./components/Themes";
// We import all the components we need in our app
import Navbar from "./components/navbar";
import Edit from "./components/edit";
import Create from "./components/create";
import RecordList from "./components/recordList";

const App = () => {
    const [theme, setTheme] = useState("light");
    const themeToggler = () => {
        theme === "light" ? setTheme("dark") : setTheme("light");
    };

    return (
        <ThemeProvider theme={theme === "light" ? lightTheme : darkTheme}>
            <>
                <GlobalStyles />
                <div>
                    {/* <button className="themebtn" onClick={themeToggler}>
                        Switch Theme
                    </button> */}
                    <Navbar themeToggler={themeToggler} />
                    <Route exact path="/">
                        <RecordList />
                    </Route>
                    <Route path="/edit/:id" component={Edit} />
                    <Route path="/create">
                        <Create />
                    </Route>
                </div>
            </>
        </ThemeProvider>
    );
};

export default App;
