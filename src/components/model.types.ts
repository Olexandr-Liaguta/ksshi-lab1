export enum ModelProperty {
  MadeWithSwimingMaterials = "MadeWithSwimingMaterials",
  NoEngine = "NoEngine",
  CarryLess5Ton = "CarryLess5Ton",
  Underwater = "Underwater",
  HasApartmens = "HasApartmens",
  LongBody = "LongBody",
  NoCivilian = "NoCivilian",
  BodyUnderWater = "BodyUnderWater",
}

export enum ModelItem {
  Raft = "Raft",
  Vessel = "Vessel",
  Ship = "Ship",
  Boat = "Boat",
  Submarine = "Submarine",
}

export namespace IModel {
  export type Chance = Record<ModelItem, Record<ModelProperty, number>>;
}
