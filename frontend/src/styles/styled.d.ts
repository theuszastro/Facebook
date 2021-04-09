import styled from 'styled-components';

declare module 'styled-components' {
   export interface DefaultTheme {
      title: string;

      colors: {
         primary: string;
         secondary: string;
         blue: string;
         blue_two: string;
         blue_dark: string;
         gray: string;
         gray_two: string;
         hover: string;
         label: string;
      };
   }
}
