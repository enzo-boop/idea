import { SnackbarProps } from "@mui/material";
import React, { createContext, useContext, useState, ReactNode } from "react";

interface ToastContextType {
  settings: SnackbarProps | null;
  setSettings: (newSettings: SnackbarProps) => void;
}

const ToastContext = createContext<ToastContextType>({settings: null, setSettings: (newSettings:SnackbarProps) => {}} as ToastContextType );

export const ToastProvider = ({ children }: { children: ReactNode }) => {
  const [settings, setSettings] = useState<SnackbarProps | null>(null);

  return (
    <ToastContext.Provider value={{ settings, setSettings }}>
      {children}
    </ToastContext.Provider>
  );
};

export const GetToastContext = () => {
  const context = useContext(ToastContext);
  if (!context) throw Error("Missing context!");
  return context;
};
