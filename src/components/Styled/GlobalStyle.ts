import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
  *{
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  ul,ol,li{
    list-style: none;
  }

  body{
    margin: 0;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
      'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
      sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  code{
    font-family: source-code-pro, Menlo, Monaco, Consolas, 'Courier New',
      monospace;
  }

  .inner{
    max-width: 1200px;
    margin: 0 auto;
  }

  .emoji{
    font-family: apple color emoji,segoe ui emoji,notocoloremoji,segoe ui symbol,android emoji,emojisymbols,emojione mozilla;
  }
`;