import { createGlobalStyle } from "styled-components";

export default createGlobalStyle`
 * {
     padding: 0;
     margin: 0;
     box-sizing: border-box;
    }

    html {
        font-size: 62.5%;
    }

    body {
        font-family: Arial, Helvetica, sans-serif;
    }

    html, body, #root {
      height: 100%;
    }

    #root {
      display: flex;
      flex-direction: column;
      background-color: #cacaca;
    }

    ul {
      list-style: none;
    }

    button {
        cursor: pointer;
    }
`;
