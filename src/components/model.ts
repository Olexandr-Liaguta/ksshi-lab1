import { IModel, ModelItem, ModelProperty } from "./model.types";

export class Model {
  constructor(public chanceTable: IModel.Chance) {}

  getMostWeightProperties(item: ModelItem): ModelProperty[] {
    const maxProperties: ModelProperty[] = [];

    for (let i = 0; i < 3; i++) {
      const [property] = this._getMaxWeightFromItem(item, maxProperties);
      maxProperties.push(property);
    }

    return maxProperties;
  }

  _getMaxWeightFromItem(
    item: ModelItem,
    ignoreProps: ModelProperty[] = []
  ): [ModelProperty, number] {
    const itemChances = Object.entries(this.chanceTable[item]) as [
      ModelProperty,
      number
    ][];
    const itemWeights = itemChances
      .filter(([property]) => !ignoreProps.includes(property))
      .map(([_, weight]) => weight);

    console.log(itemWeights);

    const max = Math.max(...itemWeights);

    return itemChances.find(
      ([prop, weight]) => weight === max && !ignoreProps.includes(prop)
    ) as [ModelProperty, number];
  }

  private _delta = 0.25;

  updateWeights(item: ModelItem, referenceProps: ModelProperty[]) {
    const mostWeightsProps = this.getMostWeightProperties(item);

    console.log("mostWeightsProps: ", mostWeightsProps);
    console.log("referenceProps: ", referenceProps);

    for (const referenceProp of referenceProps) {
      if (!mostWeightsProps.includes(referenceProp)) {
        this.chanceTable[item][referenceProp] += this._delta;

        const [maxProperty] = this._getMaxWeightFromItem(item, referenceProps);

        this.chanceTable[item][maxProperty] -= this._delta;
      }
    }
  }

  private properties: ModelProperty[] = [];

  private _getModelItemWeight(item: ModelItem): {
    item: ModelItem;
    weight: number;
  } {
    const chances = this.chanceTable[item];

    let weight = 0;
    for (const property of this.properties) {
      weight += chances[property];
    }

    return {
      item,
      weight,
    };
  }

  getMostAppropriate(properties: ModelProperty[]): ModelItem[] {
    this.properties = properties;

    const raftWeight = this._getModelItemWeight(ModelItem.Raft);
    const vesselWeight = this._getModelItemWeight(ModelItem.Vessel);
    const shipWeight = this._getModelItemWeight(ModelItem.Ship);
    const boatWeight = this._getModelItemWeight(ModelItem.Boat);
    const submarineWeight = this._getModelItemWeight(ModelItem.Submarine);

    const itemInfos = [
      raftWeight,
      vesselWeight,
      shipWeight,
      boatWeight,
      submarineWeight,
    ];

    const weights = itemInfos.map((itemInfo) => itemInfo.weight);

    const max = Math.max(...weights);

    return itemInfos.flatMap((itemInfo) =>
      itemInfo.weight === max ? [itemInfo.item] : []
    );
  }
}

export const currentModel = new Model({
  [ModelItem.Raft]: {
    [ModelProperty.MadeWithSwimingMaterials]: 3.5,
    [ModelProperty.NoEngine]: 3.5,
    [ModelProperty.CarryLess5Ton]: 3.5,
    [ModelProperty.Underwater]: 4,
    [ModelProperty.HasApartmens]: 4,
    [ModelProperty.LongBody]: 4,
    [ModelProperty.NoCivilian]: 3.75,
    [ModelProperty.BodyUnderWater]: 3.75,
  },

  [ModelItem.Vessel]: {
    [ModelProperty.MadeWithSwimingMaterials]: 3.75,
    [ModelProperty.NoEngine]: 3.75,
    [ModelProperty.CarryLess5Ton]: 3.75,
    [ModelProperty.Underwater]: 3.75,
    [ModelProperty.HasApartmens]: 3.75,
    [ModelProperty.LongBody]: 3.75,
    [ModelProperty.NoCivilian]: 3.75,
    [ModelProperty.BodyUnderWater]: 3.75,
  },

  [ModelItem.Ship]: {
    [ModelProperty.MadeWithSwimingMaterials]: 3.75,
    [ModelProperty.NoEngine]: 3.75,
    [ModelProperty.CarryLess5Ton]: 3.75,
    [ModelProperty.Underwater]: 3.75,
    [ModelProperty.HasApartmens]: 3.75,
    [ModelProperty.LongBody]: 3.75,
    [ModelProperty.NoCivilian]: 3.75,
    [ModelProperty.BodyUnderWater]: 3.75,
  },

  [ModelItem.Boat]: {
    [ModelProperty.MadeWithSwimingMaterials]: 3.75,
    [ModelProperty.NoEngine]: 3.75,
    [ModelProperty.CarryLess5Ton]: 3.75,
    [ModelProperty.Underwater]: 3.75,
    [ModelProperty.HasApartmens]: 3.75,
    [ModelProperty.LongBody]: 3.75,
    [ModelProperty.NoCivilian]: 3.75,
    [ModelProperty.BodyUnderWater]: 3.75,
  },

  [ModelItem.Submarine]: {
    [ModelProperty.MadeWithSwimingMaterials]: 3.75,
    [ModelProperty.NoEngine]: 3.75,
    [ModelProperty.CarryLess5Ton]: 3.75,
    [ModelProperty.Underwater]: 3.75,
    [ModelProperty.HasApartmens]: 3.75,
    [ModelProperty.LongBody]: 3.75,
    [ModelProperty.NoCivilian]: 3.75,
    [ModelProperty.BodyUnderWater]: 3.75,
  },
});
