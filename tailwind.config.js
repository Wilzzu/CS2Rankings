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
				mono: ['"Noto Sans Mono"'],
			},
			colors: {
				cswhitebright: "#efefef",
				cswhitesemi: "#e6e6e6",
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
				hoverwhite: "rgb(232, 232, 232)",
			},
			dropShadow: {
				header: "3px 2px 1px rgba(0, 0, 0, 0.15)",
				signature: "1px 2px 1px rgba(0,0,0, 0.2)",
				glow: "0px 0px 4px rgba(255,255,255, 0.5)",
				rating: "1px 1px 1px rgba(0, 0, 0, 0.8)",
			},
			boxShadow: {
				scoreboard: "4px 10px 10px rgba(0, 0, 0, 0.2)",
				listitem: "0px 0px 2px rgba(0, 0, 0, 0.1)",
			},
			animation: {
				highlightBorder: "highlightBorder 2.5s cubic-bezier(.05,.12,.64,.83)",
				// 3.7s cubic-bezier(0,.13,.02,-0.1) fast start
			},
			keyframes: {
				highlightBorder: {
					"0%": { backgroundPosition: "0 0" },
					"100%": { backgroundPosition: "0 168%" },
				},
			},
		},
	},
	// eslint-disable-next-line no-undef
	plugins: [require("tailwind-scrollbar")({ nocompatible: true })],
};
