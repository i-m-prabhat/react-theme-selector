# react-theme-selector

A flexible and efficient React package that allows dynamic selection of multiple themes, headers, and footers using React Context. It supports asynchronous asset fetching, lazy-loaded components, and memoized values for optimal performance.

## Features

- Dynamically switch between multiple themes.
- Select and update headers and footers on the fly.
- Supports lazy-loaded headers, footers, and themes for improved performance.
- Dynamic fetching of themes, headers, and footers from external sources (APIs, etc.).
- Memoized context values to prevent unnecessary re-renders.
- Dynamic CSS loading for theme styles.

## Installation

You can install the package using npm:

```bash
npm install react-theme-selector
```

## Usage

### 1. Setup ThemeProvider

Wrap your app inside the `ThemeProvider`. You can pass an initial theme, fetch functions for headers and footers, and a list of available themes.

```jsx
import React from 'react';
import { ThemeProvider, ThemeSelector, HeaderSelector, FooterSelector, useTheme } from 'react-theme-selector';

// Example async fetch functions
const fetchHeaders = async () => [
    () => <header>Header 1</header>,
    () => <header>Header 2</header>
];

const fetchFooters = async () => [
    () => <footer>Footer 1</footer>,
    () => <footer>Footer 2</footer>
];

const AppContent = () => {
    const { header: Header, footer: Footer, theme } = useTheme();

    return (
        <div className={`app-container ${theme}`}>
            <Header />
            <div>Main Content Here</div>
            <Footer />
        </div>
    );
};

const App = () => {
    return (
        <ThemeProvider
            initialTheme="light"
            themes={['light', 'dark']}
            fetchHeaders={fetchHeaders}
            fetchFooters={fetchFooters}
        >
            <ThemeSelector />
            <HeaderSelector />
            <FooterSelector />
            <AppContent />
        </ThemeProvider>
    );
};

export default App;
```

### 2. ThemeProvider Props

| Prop          | Type             | Description                                                                                   | Default   |
| ------------- | ---------------- | --------------------------------------------------------------------------------------------- | --------- |
| `initialTheme`| `string`         | The initial theme to apply.                                                                   | `default` |
| `themes`      | `array`          | Array of available theme names (used for dynamically loading themes).                         | Required  |
| `fetchHeaders`| `function`       | Asynchronous function to fetch an array of available headers (each a React component).         | Required  |
| `fetchFooters`| `function`       | Asynchronous function to fetch an array of available footers (each a React component).         | Required  |

### 3. ThemeSelector

This component renders a dropdown to allow users to select a theme from the available options.

```jsx
import { ThemeSelector } from 'react-theme-selector';

<ThemeSelector />;
```

### 4. HeaderSelector

This component renders a dropdown to allow users to select a header from the available options.

```jsx
import { HeaderSelector } from 'react-theme-selector';

<HeaderSelector />;
```

### 5. FooterSelector

This component renders a dropdown to allow users to select a footer from the available options.

```jsx
import { FooterSelector } from 'react-theme-selector';

<FooterSelector />;
```

### 6. Using Theme, Header, and Footer in Your App

You can use the `useTheme` hook to access the current theme, header, and footer in your app components.

```jsx
import React from 'react';
import { useTheme } from 'react-theme-selector';

const AppContent = () => {
    const { header: Header, footer: Footer, theme } = useTheme();

    return (
        <div className={`app-container ${theme}`}>
            <Header />
            <div>Main Content Here</div>
            <Footer />
        </div>
    );
};
```

### 7. Dynamically Loading Theme CSS

The `ThemeProvider` automatically loads a CSS file that matches the theme name (e.g., `light.css` or `dark.css`). Ensure that the appropriate CSS files are hosted and accessible for the themes you provide.

For example, if you pass `['light', 'dark']` as themes:

- Ensure that you have `light.css` and `dark.css` files available at the correct path.

### 8. Lazy Loading Headers and Footers

For performance optimization, headers and footers are lazily loaded using `React.lazy` and `Suspense`. Here’s an example of how you can lazily load components when fetching headers and footers:

```javascript
import React, { lazy, Suspense } from 'react';

const Header1 = lazy(() => import('./headers/Header1'));
const Header2 = lazy(() => import('./headers/Header2'));
const Footer1 = lazy(() => import('./footers/Footer1'));
const Footer2 = lazy(() => import('./footers/Footer2'));

const fetchHeaders = async () => [
    () => <Suspense fallback={<div>Loading...</div>}><Header1 /></Suspense>,
    () => <Suspense fallback={<div>Loading...</div>}><Header2 /></Suspense>
];

const fetchFooters = async () => [
    () => <Suspense fallback={<div>Loading...</div>}><Footer1 /></Suspense>,
    () => <Suspense fallback={<div>Loading...</div>}><Footer2 /></Suspense>
];
```

## Example Project

Here’s a complete example of how the package can be used in your project:

```jsx
import React from 'react';
import { ThemeProvider, ThemeSelector, HeaderSelector, FooterSelector, useTheme } from 'react-theme-selector';

// Example fetching functions
const fetchHeaders = async () => [
    () => <header>Header 1</header>,
    () => <header>Header 2</header>,
];

const fetchFooters = async () => [
    () => <footer>Footer 1</footer>,
    () => <footer>Footer 2</footer>,
];

const AppContent = () => {
    const { header: Header, footer: Footer, theme } = useTheme();

    return (
        <div className={`app-container ${theme}`}>
            <Header />
            <div>Main Content Here</div>
            <Footer />
        </div>
    );
};

const App = () => {
    return (
        <ThemeProvider
            initialTheme="light"
            themes={['light', 'dark']}
            fetchHeaders={fetchHeaders}
            fetchFooters={fetchFooters}
        >
            <ThemeSelector />
            <HeaderSelector />
            <FooterSelector />
            <AppContent />
        </ThemeProvider>
    );
};

export default App;
```

## Contributing

Contributions are welcome! Feel free to submit a pull request or open an issue for any improvements or bug fixes.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
