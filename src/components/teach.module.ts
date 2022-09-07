import { Model } from "./model";
import { ModelProperty } from "./model.types";
import { referenceModel } from "./referenceModel";

export class TeachModule {
  static teachCount = 0;

  static teachModel(model: Model) {
    const teachTries = 200;

    while (teachTries > this.teachCount) {
      const raftVariant: ModelProperty[] = [
        ModelProperty.MadeWithSwimingMaterials,
        ModelProperty.NoEngine,
        ModelProperty.CarryLess5Ton,
      ];
      this._handleTeaching(model, raftVariant);

      const vesselVariant: ModelProperty[] = [
        ModelProperty.HasApartmens,
        ModelProperty.LongBody,
        ModelProperty.BodyUnderWater,
      ];
      this._handleTeaching(model, vesselVariant);

      const shipVariant: ModelProperty[] = [
        ModelProperty.NoCivilian,
        ModelProperty.LongBody,
        ModelProperty.BodyUnderWater,
      ];
      this._handleTeaching(model, shipVariant);

      const boatVariant: ModelProperty[] = [
        ModelProperty.CarryLess5Ton,
        ModelProperty.LongBody,
        ModelProperty.BodyUnderWater,
      ];
      this._handleTeaching(model, boatVariant);

      const submarineVariant: ModelProperty[] = [
        ModelProperty.Underwater,
        ModelProperty.LongBody,
        ModelProperty.NoCivilian,
      ];
      this._handleTeaching(model, submarineVariant);

      const noCivilianVariant: ModelProperty[] = [ModelProperty.NoCivilian];
      this._handleTeaching(model, noCivilianVariant);

      const noEngineVariant: ModelProperty[] = [ModelProperty.NoEngine];
      this._handleTeaching(model, noEngineVariant);

      const bodyWaterVariant: ModelProperty[] = [ModelProperty.BodyUnderWater];
      this._handleTeaching(model, bodyWaterVariant);

      const hasApartmentsVariant: ModelProperty[] = [
        ModelProperty.HasApartmens,
      ];
      this._handleTeaching(model, hasApartmentsVariant);

      this.teachCount += 1;
    }

    console.log("After teaching: ", model);
  }

  private static _handleTeaching(model: Model, props: ModelProperty[]) {
    const referenceModelItems = referenceModel.getMostAppropriate(props);
    const currentModelItems = model.getMostAppropriate(props);

    console.log("referenceModelItems: ", referenceModelItems);
    console.log("currentModelItems: ", currentModelItems);

    for (const item of referenceModelItems) {
      if (!currentModelItems.includes(item) || currentModelItems.length > 1) {
        model.updateWeights(item, referenceModel.getMostWeightProperties(item));
      }
    }
  }
}
