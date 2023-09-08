import React, { createContext, useContext, useState, ReactNode } from 'react';

type AppContextType = {
  updateFunction: (updatedData: ListItem[]) => void;
};

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const [updateFunction, setUpdateFunction] = useState<(updatedData: ListItem[]) => void>(() => {});

  return (
    <AppContext.Provider value={{ updateFunction, setUpdateFunction }}>
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
}
