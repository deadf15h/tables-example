import { useHotkeys } from "react-hotkeys-hook";
import { hotkeys } from "../const/hotkeys/hotkeys";

export const useDisablePrint = () => {
  useHotkeys(hotkeys.CtrlP, (event) => {
    event.preventDefault();
  });

  useHotkeys(hotkeys.MetaP, (event) => {
    event.preventDefault();
  });
};
