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
  type: "General" | "Combat" | "Social";
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
}

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
  skills: {},
  additionalSkills: [],
  talents: [],
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
        linkedAttribute: string;
      }>
    ) => {
      state.skills[action.payload.skillName] = {
        displayName: action.payload.skillName,
        value: action.payload.value,
        linkedAttribute: action.payload.linkedAttribute as
          | "Strength"
          | "Agility"
          | "Wits"
          | "Empathy",
      };
    },
    addAdditionalSkill: (state, action: PayloadAction<Skill>) => {
      state.additionalSkills.push(action.payload);
    },
    updateTalents: (state, action: PayloadAction<Talent[]>) => {
      state.talents = action.payload;
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
  updateTalents,
  resetCharacter,
} = characterSlice.actions;

export default characterSlice.reducer;
