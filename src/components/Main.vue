<script lang="ts">
import { defineComponent, ref, computed } from "vue";
import { currentModel } from "./model";
import { ModelItem, ModelProperty } from "./model.types";
import { TeachModule } from "./teach.module";
import { itemTitles, UIState } from "./types";

export default defineComponent({
  setup() {
    const checkboxes: Record<ModelProperty, string> = {
      [ModelProperty.MadeWithSwimingMaterials]:
        "Виготовлений з плавучих матеріалів",
      [ModelProperty.NoEngine]: "Не передбачений двигун",
      [ModelProperty.CarryLess5Ton]: "Вантажопідйомність до 5 тонн",
      [ModelProperty.Underwater]: "Занурюються під воду",
      [ModelProperty.HasApartmens]: "Може мати жилі приміщення",
      [ModelProperty.LongBody]: "Має подовжене тіло обтічної форми",
      [ModelProperty.NoCivilian]: "Не є цивільним транспортом",
      [ModelProperty.BodyUnderWater]:
        "Значна частина корпусу знаходиться під водою (надводне плавання)",
    };

    let selectedProperties: ModelProperty[] = [];

    function toggleProperty(_property: string) {
      console.log(_property);

      const property = _property as unknown as ModelProperty;

      if (selectedProperties.includes(property)) {
        selectedProperties = selectedProperties.filter(
          (prop) => prop !== property
        );
      } else {
        selectedProperties.push(property);
      }

      console.log(selectedProperties);
    }

    const state = ref(UIState.None);
    function onClickUse() {
      state.value = state.value === UIState.Use ? UIState.None : UIState.Use;
    }

    const showUseTemplate = computed(() => state.value === UIState.Use);

    const appropriateItems = ref<ModelItem[]>([]);
    function onClickGetItems() {
      appropriateItems.value =
        currentModel.getMostAppropriate(selectedProperties);
    }
    const appropriateItemTitles = computed(() =>
      appropriateItems.value.map((item) => itemTitles[item])
    );

    const showTeachTemplate = computed(() => state.value === UIState.Teach);
    const teachTries = computed(() => TeachModule.teachCount);
    const isTeached = ref(false);
    const modelTable = computed(() => currentModel.chanceTable);
    function onClickTeach() {
      state.value =
        state.value === UIState.Teach ? UIState.None : UIState.Teach;

      TeachModule.teachModel(currentModel);

      isTeached.value = true;
    }

    return {
      checkboxes,
      toggleProperty,
      onClickUse,
      showUseTemplate,
      onClickGetItems,
      appropriateItemTitles,
      teachTries,
      onClickTeach,
      showTeachTemplate,
      isTeached,
      modelTable,
    };
  },
});
</script>



<template>
  <div class="main">
    <div class="buttons">
      <button @click="onClickTeach">Навчати модель</button>
      <button @click="onClickUse">Використати модель</button>
    </div>

    <div v-if="showTeachTemplate">
      <div>Навчаю модель...</div>
      <div>Ітерацій: {{ teachTries }}</div>
      <div class="teached" v-if="isTeached">
        <div>Завершено.</div>
        <div class="teached-table">
          <div v-for="(item, itemName) in modelTable" :key="itemName">
            {{ itemName }}:
            <div v-for="(property, propName) in item" :key="propName">
              {{ propName }}: {{ property }}
            </div>
          </div>
        </div>
      </div>
    </div>

    <div v-if="showUseTemplate" class="checkbox-container">
      <div
        v-for="(title, property) in checkboxes"
        :key="property"
        class="checkbox"
      >
        <input
          :id="property"
          type="checkbox"
          :value="property"
          class="cursor-pointer"
          @click="toggleProperty(property)"
        />
        <label :for="property" class="cursor-pointer">{{ title }}</label>
      </div>

      <div>
        <button @click="onClickGetItems">Отримати рішення</button>
      </div>

      <div v-if="appropriateItemTitles.length > 0">
        <div v-for="item in appropriateItemTitles" :key="item">
          {{ item }}
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.main {
  padding-top: 10%;
}

.buttons {
  display: flex;
  gap: 12px;
  justify-content: center;
}

.checkbox-container {
  margin-top: 20px;
  gap: 8px;
  display: flex;
  justify-content: center;
  flex-direction: column;
  padding: 0 20px;
}

.checkbox {
  display: flex;
  cursor: pointer;
}

.cursor-pointer {
  cursor: pointer;
}

.teached {
  display: flex;
  margin-top: 20px;
  justify-content: center;
  flex-direction: column;
  gap: 12px;
}

.teached-table {
  display: flex;
  flex-direction: column;
  max-width: 400px;
  align-self: center;
  gap: 20px;
  text-align: left;
}
</style>