import React, { createContext, useRef } from 'react';

export const SwiperContext = createContext();

export const SwiperProvider = ({ children }) => {
  const swiperRef = useRef(null);

  return (
    <SwiperContext.Provider value={{ swiperRef }}>
      {console.log('original context')}
      {children}
    </SwiperContext.Provider>
  );
};
