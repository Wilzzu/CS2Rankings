/** @type {import('tailwindcss').Config} */
import defaultTheme from "tailwindcss/defaultTheme";

export default {
	darkMode: "class",
	content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
	theme: {
		extend: {
			fontFamily: {
				poppins: ["Poppins"],
				hanken: ['"Hanken Grotesk"'],
				score: ["Arimo", ...defaultTheme.fontFamily.sans],
				header: ["Archivo", "Poppins"],
				mono: ['"Noto Sans Mono"'],
			},
			colors: {
				cswhitebright: "#efefef",
				darkcswhitebright: "#3A3A3A",
				cswhitesemi: "#e6e6e6",
				darkcswhitesemi: "#333333",
				cswhite: "#DADADA",
				csgray: "#BFBFBF",
				csgraydark: "#AAAAAA",
				csgraydarkest: "#575757",
				csorange: "#FFA51A",
				csorangedark: "#E38618",
				csblue: "#3c4468",
				csdarkblue: "#1f2130",
				cslightblue: "#4e546e",
				csbrightblue: "#4A68FF",
				darktext: "#323a47",
				hoverwhite: "rgb(232, 232, 232)",
				darkhoverwhite: "rgb(65, 65, 65)",
			},
			dropShadow: {
				header: "3px 2px 1px rgba(0, 0, 0, 0.15)",
				signature: "1px 2px 1px rgba(0,0,0, 0.2)",
				region: "1px 1px 0px rgba(0,0,0, 0.30)",
				glow: "0px 0px 4px rgba(255,255,255, 0.5)",
				rating: "1px 1px 1px rgba(0, 0, 0, 0.8)",
			},
			boxShadow: {
				scoreboard: "4px 10px 10px rgba(0, 0, 0, 0.2)",
				listitem: "0px 0px 2px rgba(0, 0, 0, 0.1)",
			},
			animation: {
				highlightBorder: "highlightBorder 2.5s cubic-bezier(.05,.12,.64,.83)",
				highlightBorderLight: "highlightBorder 4s cubic-bezier(.05,.12,.64,.83) 500ms",
				moveUp: "moveUp 1s ease-in-out infinite",
			},
			keyframes: {
				highlightBorder: {
					"0%": { backgroundPosition: "0 0" },
					"100%": { backgroundPosition: "0 168%" },
				},
				moveUp: {
					"0%, 100%": { transform: "translateY(0%)" },
					"50%": { transform: "translateY(-15%)" },
				},
			},
		},
	},
	// eslint-disable-next-line no-undef
	plugins: [require("tailwind-scrollbar")({ nocompatible: true })],
};
