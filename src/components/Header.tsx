import React, { FC } from "react";

import { toggleIsHeaderSticky } from "../slices/appStateSlice";
import { useAppDispatch, useAppSelector } from "../store";

export const Header: FC = () => {
  const dispatch = useAppDispatch();
  const isSticky = useAppSelector((state): boolean => state.appState.isHeaderSticky);

  const handleToggle = (): void => {
    dispatch(toggleIsHeaderSticky());
  };

  return (
    <div className="flex items-center justify-between mb-4">
      <h1 className="text-2xl font-bold">MyFin</h1>
      <button
        onClick={handleToggle}
        className="text-sm bg-gray-200 hover:bg-gray-300 text-gray-800 px-3 py-1 rounded"
      >
        {isSticky ? "Sticky" : "Static"}
      </button>
    </div>
  );
};
