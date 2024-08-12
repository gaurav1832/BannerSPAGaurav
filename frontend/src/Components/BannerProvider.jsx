import React, { createContext, useState } from "react";

// Create the context
export const BannerContext = createContext();

// Create a provider component
export const BannerProvider = ({ children }) => {
  const [banner, setBanner] = useState({
    id: null,
    title: "",
    description: "",
    timer: 0,
    link: "",
    offer: "",
    visibility: false,
  });

  return (
    <BannerContext.Provider value={{ banner, setBanner }}>
      {children}
    </BannerContext.Provider>
  );
};
