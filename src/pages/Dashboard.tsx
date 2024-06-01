import React, { useContext, useEffect } from "react";
import { withMainlayout } from "../layout";
import { ChartView, IntervalOption, SearchBar } from "../components";
import { MainContext } from "../context";

export const DashBoard: React.FC = withMainlayout(() => {
  const { stockInfo, graphViewMode, companyStocks, resetStockInfo } = useContext(MainContext);

  useEffect(() => {
    resetStockInfo();
  }, [companyStocks, graphViewMode]);

  return (
    <>
      <div className="flex p-8">
        <SearchBar />
        <IntervalOption />
      </div>
      <div className="h-[calc(100vh-230px)] w-full px-8">
        {stockInfo && (<ChartView />)}
      </div>
    </>
  );
});
