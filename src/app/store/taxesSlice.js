import { createSlice } from "@reduxjs/toolkit";
import { INITIAL_SUBMISSIONS } from '../utils/constants';

const initialState = {
  taxes: [],
  user: {},
  submissions: INITIAL_SUBMISSIONS
};

export const taxesSlice = createSlice({
  name: "taxes",
  initialState,
  reducers: {
    signin: (state, { payload }) => {
      state.user = payload;
    },
    logout: (state, { payload }) => {
      state.user = {};
    },
    taxesBase: (state, { payload }) => {
      state.taxes = payload;
    },
    addSubmission: (state, { payload }) => {
      state.submissions = [...state.submissions, payload];
    },
    deleteSubmission: (state, { payload }) => {
      state.submissions = state.submissions.filter((item, i) => i !== payload);
    },
    upsertSubmission: (state, { payload }) => {
      const updateIdx = payload.updateGlobalIdx; 
      const newSub = payload;
      delete newSub.updateGlobalIdx;
      state.submissions = [
       ...state.submissions.map((sub, i) => i === updateIdx ? newSub : sub)
      ]
    },
  },
});

export const selectTaxes = (state) => state.taxes.taxes;
export const selectUser = (state) => state.taxes.user;
export const selectSubmissions = (state) => state.taxes.submissions;

export const { signin, logout, taxesBase, addSubmission, deleteSubmission, upsertSubmission } =
  taxesSlice.actions;
export default taxesSlice.reducer;
