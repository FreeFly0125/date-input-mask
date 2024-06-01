import React, { useContext } from "react";
import { MainContext } from "../context";

export const IntervalOption: React.FC = () => {
  const { resetViewMode } = useContext(MainContext);

  const setViewMode = (e: React.ChangeEvent<HTMLSelectElement>) => {
    resetViewMode(e.target.value);
  };

  return (
    <div className="relative">
      <select className="p-4 bg-white border rounded-lg" onChange={setViewMode}>
        <option value="interday">Interday</option>
        <option value="daily">Daily</option>
        <option value="weekly">Weekly</option>
        <option value="monthly">Monthly</option>
      </select>
    </div>
  );
};
