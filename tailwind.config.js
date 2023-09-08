/** @type {import('tailwindcss').Config} */
export default {
	content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
	theme: {
		extend: {
			fontFamily: {
				poppins: ["Poppins"],
				hanken: ['"Hanken Grotesk"'],
				score: ["Arimo"],
			},
			colors: {
				cswhitebright: "#efefef",
				cswhite: "#DADADA",
				csgray: "#BFBFBF",
				csorange: "#e38618",
				csorangedark: "#d36512",
				csblue: "#3c4468",
				csdarkblue: "#1f2130",
				cslightblue: "#4e546e",
			},
		},
	},
	plugins: [],
};
