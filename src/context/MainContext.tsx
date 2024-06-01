import React, { useState } from "react";
import { CompanyStockInfo, StockInfo } from "../types";
import axios from "axios";

interface MainContextProps {
  stockInfo: StockInfo | null;
  resetStockInfo: () => void;
  companyStocks: CompanyStockInfo | null;
  resetCompanyStockInfo: (newStock: CompanyStockInfo) => void;
  graphViewMode: string;
  resetViewMode: (mode: string) => void;
}

export const MainContext = React.createContext<MainContextProps>({
  stockInfo: null,
  resetStockInfo: () => {},
  companyStocks: null,
  resetCompanyStockInfo: () => {},
  graphViewMode: "interday",
  resetViewMode: () => {},
});

interface MainProviderProps {
  children: React.ReactNode;
}

export const MainProvider: React.FC<MainProviderProps> = ({ children }) => {
  const [stockInfo, setStockInfo] = useState<StockInfo | null>(null);
  const resetStockInfo = async () => {
    if (!companyStocks) return;

    let function_str: string;
    let series_data_key: string;

    if (graphViewMode === "interday") {
      function_str = "TIME_SERIES_INTRADAY";
      series_data_key = "Time Series (5min)";
    } else if (graphViewMode === "daily") {
      function_str = "TIME_SERIES_DAILY";
      series_data_key = "Time Series (Daily)";
    } else if (graphViewMode === "weekly") {
      function_str = "TIME_SERIES_WEEKLY";
      series_data_key = "Weekly Time Series";
    } else if (graphViewMode === "monthly") {
      function_str = "TIME_SERIES_MONTHLY";
      series_data_key = "Monthly Time Series";
    } else {
      return;
    }

    const url = "https://www.alphavantage.co/query";
    const apikey = process.env.REACT_APP_API_KEY;

    let query_param = {
      function: function_str,
      symbol: companyStocks.symbol,
      apikey: apikey,
      interval: "",
    };

    if (graphViewMode === "interday") 
      query_param = {...query_param, interval: "5min"};

    const stock_response = await axios.get(url, {
      params: query_param,
    });
    const meta_data = stock_response.data["Meta Data"];
    const series_data: any = stock_response.data[series_data_key];
    setStockInfo({
      title: meta_data["1. Information"],
      symbol: meta_data["2. Symbol"],
      last_update: meta_data["3. Last Refreshed"],
      data: Object.entries(series_data)
        .map(([key, value]: [string, any]) => ({
          datetime: new Date(key),
          open: Number(value["1. open"]),
          high: Number(value["2. high"]),
          low: Number(value["3. low"]),
          close: Number(value["4. close"]),
          volume: Number(value["5. volume"]),
        }))
        .reverse(),
    });
  };

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
        stockInfo,
        resetStockInfo,
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
