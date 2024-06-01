import React, { useState } from "react";
import { CompanyStockInfo, StockInfo } from "../types";
import axios from "axios";

interface MainContextProps {
  companyStocks: CompanyStockInfo | null;
  resetCompanyStockInfo: (newStock: CompanyStockInfo) => void;
  graphViewMode: string;
  resetViewMode: (mode: string) => void;
}

export const MainContext = React.createContext<MainContextProps>({
  companyStocks: null,
  resetCompanyStockInfo: () => {},
  graphViewMode: "interday",
  resetViewMode: () => {},
});

interface MainProviderProps {
  children: React.ReactNode;
}

export const MainProvider: React.FC<MainProviderProps> = ({ children }) => {
  const [companyStocks, setCompanyStocks] = useState<CompanyStockInfo | null>(null);
  const resetCompanyStockInfo = (data: CompanyStockInfo) => {
    setCompanyStocks(data);
  };

  const [graphViewMode, setGraphViewMode] = useState<string>("interday");
  const resetViewMode = (mode: string) => {
    setGraphViewMode(mode);
  };

  return (
    <MainContext.Provider
      value={{
        companyStocks,
        resetCompanyStockInfo,
        graphViewMode,
        resetViewMode,
      }}
    >
      {children}
    </MainContext.Provider>
  );
};
