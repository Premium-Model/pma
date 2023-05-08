import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    agency:[],
  selectedAgent: null,
};

const agencySlice = createSlice({
  name: "agency",
  initialState,
  reducers:{
     selectAgent:(state, action)=>{
        const agentId = action.payload
        state.selectedAgent = state.agency.find(agent => agent.id === agentId)
     },
     updateAgency: (state, action) => {
      const { id, ...updatedFields } = action.payload;
      const agentIndex = state.findIndex((agent) => agent.id === id);
      if (agentIndex >= 0) {
        state[agentIndex] = { ...state[agentIndex], ...updatedFields };
      }
    },
  }
});

export const {selectAgent, updateAgency} = agencySlice.actions
export default agencySlice.reducer
