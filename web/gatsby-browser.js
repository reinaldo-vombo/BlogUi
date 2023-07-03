import React from 'react';
import { SanityContextProvider } from './src/context/sanityContext';
import './src/styles/global.css';

export const wrapRootElement = ({ element }) => (
  <SanityContextProvider>{element}</SanityContextProvider>
);
