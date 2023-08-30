/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		"./app/**/*.{js,ts,jsx,tsx,mdx}",
		"./pages/**/*.{js,ts,jsx,tsx,mdx}",
		"./components/**/*.{js,ts,jsx,tsx,mdx}",
	],
	theme: {
		extend: {
			gridTemplateColumns: {
				// autofits products in a grid
				// when product < 15 rem,
				// display on individual rows (1fr)
				fluid: 'repeat(auto-fit, minmax(15rem, 1fr))',
			}
		},
	},
	plugins: [],
}