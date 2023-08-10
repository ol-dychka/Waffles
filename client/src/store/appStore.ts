import { PaletteMode } from "@mui/material";
import { makeAutoObservable } from "mobx";

export default class appStore {
  mode: PaletteMode = "light";

  constructor() {
    makeAutoObservable(this);
  }

  changeMode = () => {
    this.mode = this.mode === "light" ? "dark" : "light";
  };
}
