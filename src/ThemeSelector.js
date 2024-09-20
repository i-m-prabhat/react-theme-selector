// src/ThemeSelector.js
import React, { useMemo } from 'react';
import { useTheme } from './ThemeProvider';

const ThemeSelector = () =>
{
    const { themes, theme, setTheme } = useTheme();

    // Memoize the options to avoid unnecessary re-renders
    const options = useMemo(() =>
    {
        return themes.map((th, index) => (
            <option key={index} value={th}>
                {th}
            </option>
        ));
    }, [themes]);

    return (
        <div>
            <h3>Select Theme</h3>
            <select value={theme} onChange={(e) => setTheme(e.target.value)}>
                {options}
            </select>
        </div>
    );
};

export default ThemeSelector;
