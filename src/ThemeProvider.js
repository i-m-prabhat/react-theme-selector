// src/ThemeProvider.js
import React, { createContext, useState, useContext, useMemo, useEffect } from 'react';
import PropTypes from 'prop-types';

// Create the context
const ThemeContext = createContext();

// Helper function to load CSS for the selected theme
const loadThemeCSS = (theme) =>
{
    const linkElement = document.getElementById('theme-stylesheet');

    if (!linkElement)
    {
        const newLinkElement = document.createElement('link');
        newLinkElement.id = 'theme-stylesheet';
        newLinkElement.rel = 'stylesheet';
        newLinkElement.href = `${theme}.css`; // Assuming the theme CSS files are hosted
        document.head.appendChild(newLinkElement);
    } else
    {
        linkElement.href = `${theme}.css`;
    }
};

// Create the provider
export const ThemeProvider = ({ children, initialTheme = 'default', fetchHeaders, fetchFooters, themes }) =>
{
    const [theme, setTheme] = useState(initialTheme);
    const [headers, setHeaders] = useState([]);
    const [header, setHeader] = useState(null);
    const [footers, setFooters] = useState([]);
    const [footer, setFooter] = useState(null);

    // Fetch headers and footers dynamically
    useEffect(() =>
    {
        const fetchAssets = async () =>
        {
            const fetchedHeaders = await fetchHeaders();
            const fetchedFooters = await fetchFooters();

            setHeaders(fetchedHeaders);
            setFooters(fetchedFooters);

            // Set default header and footer
            setHeader(fetchedHeaders[0]);
            setFooter(fetchedFooters[0]);
        };

        fetchAssets();
    }, [fetchHeaders, fetchFooters]);

    // Load theme CSS whenever the theme changes
    useEffect(() =>
    {
        loadThemeCSS(theme);
    }, [theme]);

    // Memoize the context value to optimize re-renders
    const contextValue = useMemo(() => ({
        theme,
        setTheme,
        header,
        setHeader,
        footer,
        setFooter,
        themes,
        headers,
        footers,
    }), [theme, headers, header, footers, footer, themes]);

    return <ThemeContext.Provider value={contextValue}>{children}</ThemeContext.Provider>;
};

// Hook to use the theme context
export const useTheme = () => useContext(ThemeContext);

// Prop types
ThemeProvider.propTypes = {
    children: PropTypes.node.isRequired,
    initialTheme: PropTypes.string,
    fetchHeaders: PropTypes.func.isRequired,
    fetchFooters: PropTypes.func.isRequired,
    themes: PropTypes.arrayOf(PropTypes.string).isRequired,
};
