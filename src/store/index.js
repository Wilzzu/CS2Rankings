import { configureStore, createSlice } from "@reduxjs/toolkit";

const lightweightSlice = createSlice({
	name: "lightweight",
	initialState: { lightweight: false },
	reducers: {
		toggle(state, action) {
			state.lightweight = action.payload;
		},
	},
});
export const actions = lightweightSlice.actions;
const store = configureStore({
	reducer: lightweightSlice.reducer,
});

export default store;
