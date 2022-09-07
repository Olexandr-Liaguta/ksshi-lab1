import { Model } from "./model";
import { ModelItem, ModelProperty } from "./model.types";

export const referenceModel = new Model({
  [ModelItem.Raft]: {
    [ModelProperty.MadeWithSwimingMaterials]: 12,
    [ModelProperty.NoEngine]: 12,
    [ModelProperty.CarryLess5Ton]: 6,
    [ModelProperty.Underwater]: 0,
    [ModelProperty.HasApartmens]: 0,
    [ModelProperty.LongBody]: 0,
    [ModelProperty.NoCivilian]: 0,
    [ModelProperty.BodyUnderWater]: 0,
  },

  [ModelItem.Vessel]: {
    [ModelProperty.MadeWithSwimingMaterials]: 0,
    [ModelProperty.NoEngine]: 0,
    [ModelProperty.CarryLess5Ton]: 0,
    [ModelProperty.Underwater]: 0,
    [ModelProperty.HasApartmens]: 20,
    [ModelProperty.LongBody]: 4,
    [ModelProperty.NoCivilian]: 0,
    [ModelProperty.BodyUnderWater]: 6,
  },

  [ModelItem.Ship]: {
    [ModelProperty.MadeWithSwimingMaterials]: 0,
    [ModelProperty.NoEngine]: 0,
    [ModelProperty.CarryLess5Ton]: 0,
    [ModelProperty.Underwater]: 0,
    [ModelProperty.HasApartmens]: 0,
    [ModelProperty.LongBody]: 4,
    [ModelProperty.NoCivilian]: 20,
    [ModelProperty.BodyUnderWater]: 6,
  },

  [ModelItem.Boat]: {
    [ModelProperty.MadeWithSwimingMaterials]: 0,
    [ModelProperty.NoEngine]: 0,
    [ModelProperty.CarryLess5Ton]: 20,
    [ModelProperty.Underwater]: 0,
    [ModelProperty.HasApartmens]: 0,
    [ModelProperty.LongBody]: 4,
    [ModelProperty.NoCivilian]: 0,
    [ModelProperty.BodyUnderWater]: 6,
  },

  [ModelItem.Submarine]: {
    [ModelProperty.MadeWithSwimingMaterials]: 0,
    [ModelProperty.NoEngine]: 0,
    [ModelProperty.CarryLess5Ton]: 0,
    [ModelProperty.Underwater]: 20,
    [ModelProperty.HasApartmens]: 0,
    [ModelProperty.LongBody]: 4,
    [ModelProperty.NoCivilian]: 6,
    [ModelProperty.BodyUnderWater]: 0,
  },
});
