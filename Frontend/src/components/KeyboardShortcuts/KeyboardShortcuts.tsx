import React, { FC } from "react";

import { DoneTransactionShortcut } from "./DoneTransactionShortcut";
import { RepeatTransactionShortcut } from "./RepeatTransactionShortcut";

export const KeyboardShortcuts: FC = () => {
  return (
    <>
      <RepeatTransactionShortcut />
      <DoneTransactionShortcut />
    </>
  );
};
