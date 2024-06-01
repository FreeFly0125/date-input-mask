import React from "react";
import { withMainlayout } from "../layout";
import { SearchBar } from "../components";

export const DashBoard: React.FC = withMainlayout(() => {
  return (
    <SearchBar />
  );
});
