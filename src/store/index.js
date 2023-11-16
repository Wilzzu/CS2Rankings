import { configureStore, createSlice } from "@reduxjs/toolkit";

const defaultValues = {
	lightweight: false,
	darkmode: false,
	hideunknown: true,
};

function getCookie(name) {
	function escape(s) {
		return s.replace(/([.*+?^$(){}|[\]/\\])/g, "\\$1");
	}
	let match = document.cookie.match(RegExp("(?:^|;\\s*)" + escape("CS2RANKINGS") + "=([^;]*)"));
	if (match) {
		try {
			if (typeof JSON.parse(match[1])[name] === "undefined") return defaultValues[name]; // If value isn't found on cookie add it manually (aka if new cookies are added afterwards and user still has the old ones)
			return JSON.parse(match[1])[name];
		} catch (e) {
			return defaultValues[name];
		}
	} else return defaultValues[name];
}

const storeSlice = createSlice({
	name: "store",
	initialState: {
		lightweight: getCookie("lightweight"),
		darkmode: getCookie("darkmode"),
		hideunknown: getCookie("hideunknown"),
	},
	reducers: {
		toggleLightweight(state) {
			state.lightweight = !state.lightweight;
		},
		toggleDarkmode(state) {
			state.darkmode = !state.darkmode;
		},
		toggleUnknown(state) {
			state.hideunknown = !state.hideunknown;
		},
	},
});

export const actions = storeSlice.actions;

const store = configureStore({
	reducer: storeSlice.reducer,
});

export default store;
