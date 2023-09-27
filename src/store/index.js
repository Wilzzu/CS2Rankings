import { configureStore, createSlice } from "@reduxjs/toolkit";

function getCookie(name) {
	function escape(s) {
		return s.replace(/([.*+?^$(){}|[\]/\\])/g, "\\$1");
	}
	var match = document.cookie.match(RegExp("(?:^|;\\s*)" + escape("CS2RANKINGS") + "=([^;]*)"));
	if (match) {
		try {
			return JSON.parse(match[1])[name];
		} catch (e) {
			return false;
		}
	} else return false;
}

const storeSlice = createSlice({
	name: "store",
	initialState: {
		lightweight: getCookie("lightweight"),
		darkmode: getCookie("darkmode"),
	},
	reducers: {
		toggleLightweight(state) {
			state.lightweight = !state.lightweight;
		},
		toggleDarkmode(state) {
			state.darkmode = !state.darkmode;
		},
	},
});

export const actions = storeSlice.actions;

const store = configureStore({
	reducer: storeSlice.reducer,
});

export default store;
