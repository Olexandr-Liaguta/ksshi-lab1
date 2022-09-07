import { ModelItem } from "./model.types";

export enum UIState {
  None,
  Teach,
  Use,
}

export const itemTitles: Record<ModelItem, string> = {
  [ModelItem.Boat]: "Човен",
  [ModelItem.Raft]: "Пліт",
  [ModelItem.Ship]: "Корабель",
  [ModelItem.Submarine]: "Субмарина",
  [ModelItem.Vessel]: "Судно",
};
