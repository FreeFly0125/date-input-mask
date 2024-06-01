import React from "react";

export const HeaderBarView: React.FC = () => {
  return (
    <div className="z-20 sticky top-0 w-full min-h-28 max-h-28 flex p-3 flex-row shadow-md shadow-black justify-between items-center xl:py-[1.375rem] bg-white">
      <div className="w-48 text-black text-2xl">Stock Price</div>
    </div>
  );
};
