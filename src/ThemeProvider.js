// src/ThemeProvider.js
import React, { createContext, useState, useContext } from 'react';
import PropTypes from 'prop-types';

// Create the context
const ThemeContext = createContext();

// Create the provider
export const ThemeProvider = ({ children, initialTheme = 'default', themes, headers, footers }) =>
{
    const [theme, setTheme] = useState(initialTheme);
    const [header, setHeader] = useState(headers[0]);
    const [footer, setFooter] = useState(footers[0]);

    const value = {
        theme,
        setTheme,
        header,
        setHeader,
        footer,
        setFooter,
        themes,
        headers,
        footers,
    };

    return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
};

// Hook to use the theme context
export const useTheme = () => useContext(ThemeContext);

// Prop types
ThemeProvider.propTypes = {
    children: PropTypes.node.isRequired,
    initialTheme: PropTypes.string,
    themes: PropTypes.arrayOf(PropTypes.string).isRequired,
    headers: PropTypes.arrayOf(PropTypes.element).isRequired,
    footers: PropTypes.arrayOf(PropTypes.element).isRequired,
};
