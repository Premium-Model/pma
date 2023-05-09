import { createSlice } from "@reduxjs/toolkit";
import client1 from "../Images/img/client1.jpg";
import client2 from "../Images/img/client2.jpg";
import client3 from "../Images/img/client3.jpg";

const initialState = {
  models: [],
  selectedModel: null,
};

const modelSlice = createSlice({
  name: "models",
  initialState,
  reducers: {
    selectModel: (state, action) => {
      const modelId = action.payload;
      state.selectedModel = state.models.find((model) => model.id === modelId);
    },
    updateModel: (state, action) => {
      const { id, ...updatedFields } = action.payload;
      const modelIndex = state.findIndex((model) => model.id === id);
      if (modelIndex >= 0) {
        state[modelIndex] = { ...state[modelIndex], ...updatedFields };
      }
    },
  },
});

export const { selectModel, updateModel } = modelSlice.actions;
export default modelSlice.reducer;
