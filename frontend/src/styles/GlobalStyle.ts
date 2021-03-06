import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
   :root {
      font-size: 62.5%;

      --background: #f0f2f5;
      --blue: #1877f2;
      --green: #42b72a;
      --green-hover: green;
   }

   * {
      padding: 0;
      margin: 0;

      box-sizing: border-box;
   }

   html, body {
      width: 100vw;
      height: 100vh;

      overflow-x: hidden;
      /* overflow-y: scroll; */
   }

   #Logo{
      max-width: 32rem;
      max-height: 12rem;
   }

   h1, h2, h3, h4, h5, h6, p, input, button, textarea {
      font-family: Helvetica, Arial, sans-serif;
   }
`;
