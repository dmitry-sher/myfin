import React, { FC } from "react";

import { useAppContext } from "../../context/AppContext";

export const Header: FC = () => {
  const { isHeaderSticky, setIsHeaderSticky } = useAppContext();

  const handleToggle = (): void => {
    setIsHeaderSticky(!isHeaderSticky);
  };

  const headerClass = [
    "flex items-center justify-between mb-4",
    isHeaderSticky ? "pt-2" : ""
  ].join(" ");

  return (
    <div className={headerClass}>
      <h1 className="text-2xl font-bold">MyFin</h1>
      <button
        onClick={handleToggle}
        className="text-sm bg-gray-200 hover:bg-gray-300 text-gray-800 px-3 py-1 rounded"
      >
        {isHeaderSticky ? "Sticky" : "Static"}
      </button>
    </div>
  );
};
