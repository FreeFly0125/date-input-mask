import React, { useContext, useEffect, useState } from "react";
import { useDebounce } from "../hooks";
import axios from "axios";
import { MainContext } from "../context";

interface BaseStockInfo {
  id: number;
  symbol: string;
  name: string;
  type: string;
  region: string;
  timezone: string;
  currency: string;
}

export const SearchBar: React.FC = () => {
  const [schTxt, setSrcTxt] = useState<string>("");
  const dbounceTxt = useDebounce(schTxt, 500);
  const [schStockSymbols, setSchStockSymbols] = useState<BaseStockInfo[]>([]);
  const [isSearch, setIsSearch] = useState<boolean>(false);

  const { resetCompanyStockInfo } = useContext(MainContext);

  const searchStock = async () => {
    if (!dbounceTxt) return;
    if (!isSearch) return;

    const url = "https://www.alphavantage.co/query";
    const apikey = process.env.REACT_APP_API_KEY;
    const response = await axios.get(url, {
      params: {
        function: "SYMBOL_SEARCH",
        keywords: dbounceTxt,
        apikey: apikey,
      },
    });

    const data: any = response.data["bestMatches"];

    setSchStockSymbols(
      data.map((stock: any, index: number) => ({
        id: index,
        symbol: stock["1. symbol"],
        name: stock["2. name"],
        type: stock["3. type"],
        region: stock["4. region"],
        timezone: stock["7. timezone"],
        currency: stock["8. currency"],
      }))
    );
  };

  const confirmStock = async (stock: BaseStockInfo) => {
    setIsSearch(false);
    setSchStockSymbols([]);
    setSrcTxt(stock.symbol);

    const url = "https://www.alphavantage.co/query";
    const apikey = process.env.REACT_APP_API_KEY;
    const response = await axios.get(url, {
      params: {
        function: "GLOBAL_QUOTE",
        symbol: stock.symbol,
        apikey: apikey,
      },
    });

    const data: any = response.data["Global Quote"];

    resetCompanyStockInfo({
      symbol: stock.symbol,
      company: stock.name,
      type: stock.type,
      price: Number(data["05. price"]),
      currency: stock.currency,
      region: stock.region,
      timezone: stock.timezone,
      last_trade: data["07. latest trading day"],
      change: Number(data["09. change"]),
    });
  };

  useEffect(() => {
    searchStock();
    setIsSearch(true);
  }, [dbounceTxt]);

  return (
    <>
      <div className="relative w-96 mx-auto">
        <div className="relative">
          <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
            <svg
              className="w-4 h-4 text-gray-500 dark:text-gray-400"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 20"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
              />
            </svg>
          </div>
          <input
            type="search"
            id="default-search"
            className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Search Stocks"
            value={schTxt}
            onChange={(e) => {
              setSrcTxt(e.target.value);
            }}
            required
          />
          <button
            type="submit"
            onClick={searchStock}
            className="text-white absolute top-2.5 end-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-100 font-medium rounded-lg text-sm px-4 py-2 "
          >
            Search
          </button>
        </div>
        <div className="absolute">
          <ul>
            {isSearch &&
              schStockSymbols.map((stock) => (
                <li
                  key={stock.id}
                  className="p-2 border border-1 bg-white"
                  onClick={() => confirmStock(stock)}
                >
                  <div className="flex justify-between items-stretch">
                    <p className="w-1/5">{stock.symbol}</p>
                    <p className="w-3/5">{stock.name}</p>
                  </div>
                </li>
              ))}
          </ul>
        </div>
      </div>
    </>
  );
};
