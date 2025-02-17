import { NextRouter, useRouter } from "next/router";
import React, { createContext, useContext, useState, ReactNode, useEffect } from "react";

interface RouterContextType {
  router: NextRouter | null;
  setRouter: (router: NextRouter) => void;
}

const RouterContext = createContext<RouterContextType>({
  router: null,
  setRouter: (router: NextRouter) => {},
} as RouterContextType);

export const RouterProvider = ({ children }: { children: ReactNode }) => {
  const [router, setRouter] = useState<NextRouter | null>(null);

  return (
    <RouterContext.Provider value={{ router, setRouter }}>
      {children}
    </RouterContext.Provider>
  );
};

export const GetRouterContext = () => {
  const context = useContext(RouterContext);
  if (!context) throw Error("Missing context!");
  return context;
};
