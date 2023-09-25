import { configureStore, createSlice } from "@reduxjs/toolkit";

function getCookie() {
	function escape(s) {
		return s.replace(/([.*+?^$(){}|[\]/\\])/g, "\\$1");
	}
	var match = document.cookie.match(RegExp("(?:^|;\\s*)" + escape("CS2RANKINGS") + "=([^;]*)"));
	if (match) {
		try {
			return JSON.parse(match[1]).lightweight;
		} catch (e) {
			return false;
		}
	} else return false;
}

const lightweightSlice = createSlice({
	name: "lightweight",
	initialState: { lightweight: getCookie() },
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
