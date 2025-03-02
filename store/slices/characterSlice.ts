import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  // gameSystems: [],
  selectedSystem: "",
  selectedSetting: "",
  name: "",
  description: "",
  avatar: null,
  archetype: "",
  race: "",
  appearance: "",
  bigDream: "",
  stats: {
    strength: 0,
    agility: 0,
    plot: 0,
    empathy: 0,
  },
  skills: Array(12).fill(0),
  bio: "",
  gameSystems: [
    // Hardcoded temporary game systems
    { name: "Fantasy RPG", settings: ["Medieval", "High Fantasy"] },
    { name: "Sci-Fi Adventure", settings: ["Space Colony", "Cyberpunk City"] },
    {
      name: "Post-Apocalyptic",
      settings: ["Nuclear Wasteland", "Zombie Survival"],
    },
  ],
};

// export const fetchGameSystems = createAsyncThunk(
//   "character/fetchGameSystems",
//   async () => {
//     const response = await axios.get(
//       "https://your-backend.com/api/game-systems"
//     );
//     return response.data;
//   }
// );

const characterSlice = createSlice({
  name: "character",
  initialState,
  reducers: {
    setSelectedSystem: (state, action: PayloadAction<string>) => {
      state.selectedSystem = action.payload;
      state.selectedSetting = "";
    },
    setSelectedSetting: (state, action: PayloadAction<string>) => {
      state.selectedSetting = action.payload;
    },
    setName: (state, action: PayloadAction<string>) => {
      state.name = action.payload;
    },
    setDescription: (state, action: PayloadAction<string>) => {
      state.description = action.payload;
    },
    setAvatar: (state, action: PayloadAction<any>) => {
      state.avatar = action.payload;
    },
    setArchetype: (state, action: PayloadAction<string>) => {
      state.archetype = action.payload;
    },
    setRace: (state, action: PayloadAction<string>) => {
      state.race = action.payload;
    },
    setAppearance: (state, action: PayloadAction<string>) => {
      state.appearance = action.payload;
    },
    setBigDream: (state, action: PayloadAction<string>) => {
      state.bigDream = action.payload;
    },
    setStats: (
      state,
      action: PayloadAction<{ stat: keyof typeof state.stats; value: number }>
    ) => {
      state.stats[action.payload.stat] = action.payload.value;
    },
    setSkills: (
      state,
      action: PayloadAction<{ index: number; value: number }>
    ) => {
      state.skills[action.payload.index] = action.payload.value;
    },
    setBio: (state, action: PayloadAction<string>) => {
      state.bio = action.payload;
    },
  },
  // extraReducers: (builder) => {
  //   builder.addCase(fetchGameSystems.fulfilled, (state, action) => {
  //     state.gameSystems = action.payload;
  //   });
  // },
});

export const {
  setSelectedSystem,
  setSelectedSetting,
  setName,
  setDescription,
  setAvatar,
  setArchetype,
  setRace,
  setAppearance,
  setBigDream,
  setStats,
  setSkills,
  setBio,
} = characterSlice.actions;
export default characterSlice.reducer;
