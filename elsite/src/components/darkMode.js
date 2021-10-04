import { React, useState, useEffect } from "react";

const DarkMode = () => {
    const [darkMode, setDarkMode] = useState(true);

    useEffect(() => {
        darkMode ? setDarkMode(false) : setDarkMode(true);
    }, []);
    // const darkToggler = () => {
    //     dark ? setDark(false) : setDark(true);
    // };
    return darkMode;
};

export default DarkMode;
