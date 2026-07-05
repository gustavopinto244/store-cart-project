import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
    #root {
    min-height: 100vh;
    }

    body {
    margin: 0;
    min-width: 320px;
    min-height: 100vh;
    font-family: Inter, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
    color: #0f172a;
    background:
        radial-gradient(circle at top left, rgba(251, 191, 36, 0.18), transparent 24%),
        radial-gradient(circle at bottom right, rgba(59, 130, 246, 0.1), transparent 28%),
        #f8fafc;
    }

    body a {
    color: inherit;
    }

    html {
    scroll-behavior: smooth;
    }

    * {
    box-sizing: border-box;
    }

    body {
    margin: 0;
    }
`
