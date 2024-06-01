import React, { useContext, useState, useEffect } from "react";
import { AgChartsReact } from "ag-charts-react";
import { AgChartOptions } from "ag-charts-enterprise";
import "ag-charts-enterprise";
import { MainContext } from "../context";

export const ChartView: React.FC = () => {
  const { stockInfo } = useContext(MainContext);

  const [options, setOptions] = useState<AgChartOptions>({
    data: stockInfo?.data,
    title: {
      text: stockInfo?.title,
    },
    subtitle: {
      text: "Stock OHLC Prices",
    },
    footnote: {
      text: "1 Aug 2023 - 1 Nov 2023",
    },
    series: [
      {
        type: "candlestick",
        xKey: "datetime",
        xName: "Date",
        lowKey: "low",
        highKey: "high",
        openKey: "open",
        closeKey: "close",
      },
    ],
  });

  useEffect(() => {
    const st_dt = stockInfo?.data[0]["datetime"];
    const end_dt = stockInfo?.data[stockInfo?.data.length - 1]["datetime"];

    const footnote_txt = st_dt?.toLocaleDateString() + " - " + end_dt?.toLocaleDateString();

    setOptions({
      ...options,
      data: stockInfo?.data,
      title: { text: stockInfo?.title },
      footnote: { text: footnote_txt },
    });
  }, [stockInfo]);

  return (
    <>
      <AgChartsReact options={options} />
    </>
  );
};
