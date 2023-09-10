/** @type {import('tailwindcss').Config} */
export default {
	content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
	theme: {
		extend: {
			fontFamily: {
				poppins: ["Poppins"],
				hanken: ['"Hanken Grotesk"'],
				score: ["Arimo"],
				header: ["Archivo"],
			},
			colors: {
				cswhitebright: "#efefef",
				cswhite: "#DADADA",
				csgray: "#BFBFBF",
				csgraydark: "#AAAAAA",
				csgraydarkest: "#575757",
				csorange: "#e38618",
				csorangedark: "#d36512",
				csblue: "#3c4468",
				csdarkblue: "#1f2130",
				cslightblue: "#4e546e",
				csbrightblue: "#4A68FF",
				darktext: "#323a47",
			},
			dropShadow: {
				header: "3px 2px 1px rgba(0, 0, 0, 0.15)",
				signature: "1px 2px 1px rgba(0,0,0, 0.2)",
				glow: "0px 0px 4px rgba(255,255,255, 0.5)",
			},
			boxShadow: {
				scoreboard: "4px 10px 10px rgba(0, 0, 0, 0.2)",
			},
		},
	},
	plugins: [],
};
