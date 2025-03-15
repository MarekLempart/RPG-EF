import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Attribute {
  value: number;
  displayName: string;
}

interface Skill {
  displayName: string;
  value: number;
  linkedAttribute: "Strength" | "Agility" | "Wits" | "Empathy";
}

interface Talent {
  name: string;
  description: string;
  bonus: "+1" | "+2";
  level: "1" | "2" | "3";
  talentType: "Active" | "Passive" | "Situational";
}

interface CharacterState {
  RPGSystem: string;
  name: string;
  age: "Young" | "Adult" | "Old";
  archetype: string;
  race: string;
  attributes: {
    Strength: Attribute;
    Agility: Attribute;
    Wits: Attribute;
    Empathy: Attribute;
  };
  skills: Record<string, Skill>;
  additionalSkills: Skill[];
  talents: Talent[];
  items: {
    weapons: string;
    armor: string;
    gear: string;
  };
  appearance: string;
  history: string;
  bigDream: string;
}

const defaultSkills: Record<string, Skill> = {
  Craft: { displayName: "Craft", value: 0, linkedAttribute: "Strength" },
  Endure: { displayName: "Endure", value: 0, linkedAttribute: "Strength" },
  Fight: { displayName: "Fight", value: 0, linkedAttribute: "Strength" },
  Sneak: { displayName: "Sneak", value: 0, linkedAttribute: "Agility" },
  Move: { displayName: "Move", value: 0, linkedAttribute: "Agility" },
  Shoot: { displayName: "Shoot", value: 0, linkedAttribute: "Agility" },
  Scout: { displayName: "Scout", value: 0, linkedAttribute: "Wits" },
  Comprehend: { displayName: "Comprehend", value: 0, linkedAttribute: "Wits" },
  Survive: { displayName: "Survive", value: 0, linkedAttribute: "Wits" },
  Manipulate: {
    displayName: "Manipulate",
    value: 0,
    linkedAttribute: "Empathy",
  },
  SenseEmotion: {
    displayName: "SenseEmotion",
    value: 0,
    linkedAttribute: "Empathy",
  },
  Heal: { displayName: "Heal", value: 0, linkedAttribute: "Empathy" },
};

const initialState: CharacterState = {
  RPGSystem: "Year Zero Engine",
  name: "",
  age: "Adult",
  archetype: "",
  race: "",
  attributes: {
    Strength: { value: 0, displayName: "Strength" },
    Agility: { value: 0, displayName: "Agility" },
    Wits: { value: 0, displayName: "Wits" },
    Empathy: { value: 0, displayName: "Empathy" },
  },
  skills: defaultSkills,
  additionalSkills: [],
  talents: [],
  items: {
    weapons: "",
    armor: "",
    gear: "",
  },
  appearance: "",
  history: "",
  bigDream: "",
};

const characterSlice = createSlice({
  name: "character",
  initialState,
  reducers: {
    setRPGSystem: (state, action: PayloadAction<string>) => {
      state.RPGSystem = action.payload;
    },
    setCharacterDetails: (
      state,
      action: PayloadAction<{
        name: string;
        age: "Young" | "Adult" | "Old";
        archetype: string;
        race: string;
      }>
    ) => {
      state.name = action.payload.name;
      state.age = action.payload.age;
      state.archetype = action.payload.archetype;
      state.race = action.payload.race;
    },
    updateAttribute: (
      state,
      action: PayloadAction<{
        attribute: keyof CharacterState["attributes"];
        value: number;
        displayName?: string;
      }>
    ) => {
      state.attributes[action.payload.attribute].value = action.payload.value;
      if (action.payload.displayName) {
        state.attributes[action.payload.attribute].displayName =
          action.payload.displayName;
      }
    },
    updateSkill: (
      state,
      action: PayloadAction<{
        skillName: string;
        value: number;
        linkedAttribute: "Strength" | "Agility" | "Wits" | "Empathy";
      }>
    ) => {
      if (state.skills[action.payload.skillName]) {
        state.skills[action.payload.skillName].value = action.payload.value;
      }
    },
    addAdditionalSkill: (
      state,
      action: PayloadAction<{
        skillName: string;
        linkedAttribute: "Strength" | "Agility" | "Wits" | "Empathy";
      }>
    ) => {
      // Add new additional skill with an initial value of 0
      state.additionalSkills.push({
        displayName: action.payload.skillName,
        value: 0,
        linkedAttribute: action.payload.linkedAttribute,
      });
    },

    updateAdditionalSkill: (
      state,
      action: PayloadAction<{
        skillName: string;
        value: number;
      }>
    ) => {
      const skill = state.additionalSkills.find(
        (s) => s.displayName === action.payload.skillName
      );
      if (skill) {
        skill.value = action.payload.value;
      }
    },
    updateTalents: (state, action: PayloadAction<Talent[]>) => {
      state.talents = action.payload;
    },
    setItems: (
      state,
      action: PayloadAction<{ weapons: string; armor: string; gear: string }>
    ) => {
      state.items = action.payload;
    },
    setAppearance: (state, action: PayloadAction<string>) => {
      state.appearance = action.payload;
    },
    setHistory: (state, action: PayloadAction<string>) => {
      state.history = action.payload;
    },
    setBigDream: (state, action: PayloadAction<string>) => {
      state.bigDream = action.payload;
    },
    resetCharacter: () => initialState,
  },
});

export const {
  setRPGSystem,
  setCharacterDetails,
  updateAttribute,
  updateSkill,
  addAdditionalSkill,
  updateAdditionalSkill,
  updateTalents,
  resetCharacter,
  setItems,
  setAppearance,
  setHistory,
  setBigDream,
} = characterSlice.actions;

export default characterSlice.reducer;
