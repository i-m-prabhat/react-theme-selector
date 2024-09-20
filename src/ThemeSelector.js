// src/ThemeSelector.js
import React from 'react';
import { useTheme } from './ThemeProvider';

const ThemeSelector = () =>
{
    const { themes, theme, setTheme } = useTheme();

    return (
        <div>
            <h3>Select Theme</h3>
            <select value={theme} onChange={(e) => setTheme(e.target.value)}>
                {themes.map((th, index) => (
                    <option key={index} value={th}>
                        {th}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default ThemeSelector;
