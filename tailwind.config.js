/** @type {import('tailwindcss').Config} */
export default {
	content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
	theme: {
		extend: {
			fontFamily: {
				sans: ["Noto Sans", "sans-serif"],
			},
		},
	},
	// plugins: [require("@tailwindcss/typography"), require("daisyui")],
	plugins: [require("daisyui")],
};
