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

    .cart-toast {
      position: fixed;
      bottom: 32px;
      right: 32px;
      z-index: 9999;
      display: flex;
      align-items: center;
      gap: 10px;
      padding: 14px 22px;
      background: #0f172a;
      color: #f8fafc;
      font-weight: 700;
      font-size: 0.9rem;
      border-radius: 16px;
      box-shadow: 0 12px 32px rgba(15, 23, 42, 0.28);
      opacity: 0;
      transform: translateY(12px);
      pointer-events: none;
      transition: opacity 0.3s ease, transform 0.3s ease;
    }

    .cart-toast--visible {
      opacity: 1;
      transform: translateY(0);
    }
`;
