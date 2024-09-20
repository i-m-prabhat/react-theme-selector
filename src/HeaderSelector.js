// src/HeaderSelector.js
import React from 'react';
import { useTheme } from './ThemeProvider';

const HeaderSelector = () =>
{
    const { headers, header, setHeader } = useTheme();

    return (
        <div>
            <h3>Select Header</h3>
            <select value={headers.indexOf(header)} onChange={(e) => setHeader(headers[e.target.value])}>
                {headers.map((headerComp, index) => (
                    <option key={index} value={index}>
                        Header {index + 1}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default HeaderSelector;
