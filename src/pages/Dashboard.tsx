import React from "react";
import { withMainlayout } from "../layout";
import { IntervalOption, SearchBar } from "../components";

export const DashBoard: React.FC = withMainlayout(() => {
  return (
    <>
      <div className="flex p-8">
        <SearchBar />
        <IntervalOption />
      </div>
    </>
  );
});
