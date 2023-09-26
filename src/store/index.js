import { configureStore, createSlice } from "@reduxjs/toolkit";

function getCookie(type) {
	function escape(s) {
		return s.replace(/([.*+?^$(){}|[\]/\\])/g, "\\$1");
	}
	var match = document.cookie.match(RegExp("(?:^|;\\s*)" + escape("CS2RANKINGS") + "=([^;]*)"));
	if (match) {
		try {
			if (type === "lightweight") return JSON.parse(match[1]).lightweight;
			if (type === "darkmode") return JSON.parse(match[1]).darkmode;
		} catch (e) {
			return false;
		}
	} else return false;
}

const storeSlice = createSlice({
	name: "store",
	initialState: { lightweight: getCookie("lightweight"), darkmode: getCookie("darkmode") },
	reducers: {
		toggleLightweight(state, action) {
			state.lightweight = action.payload;
		},
		toggleDarkmode(state, action) {
			state.darkmode = action.payload;
		},
	},
});

export const actions = storeSlice.actions;

const store = configureStore({
	reducer: storeSlice.reducer,
});

export default store;
