// src/FooterSelector.js
import React from 'react';
import { useTheme } from './ThemeProvider';

const FooterSelector = () =>
{
    const { footers, footer, setFooter } = useTheme();

    return (
        <div>
            <h3>Select Footer</h3>
            <select value={footers.indexOf(footer)} onChange={(e) => setFooter(footers[e.target.value])}>
                {footers.map((footerComp, index) => (
                    <option key={index} value={index}>
                        Footer {index + 1}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default FooterSelector;
