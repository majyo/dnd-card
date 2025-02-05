import type { Config } from 'tailwindcss';
import flowbite from 'flowbite/plugin';

export default {
	content: [
		'./src/**/*.{html,js,svelte,ts}',
		'./node_modules/flowbite-svelte/**/*.{html,js,svelte,ts}'
	],

	theme: {
		extend: {
			colors: {
				// Primary colors
				primary: {
					DEFAULT: '#E63946', // Vibrant red for important actions/highlights
					light: '#FF4D5B',
					dark: '#CC2B37'
				},
				// Background colors
				background: {
					DEFAULT: '#1A1B1E', // Main background
					lighter: '#2A2B2E', // Slightly lighter bg for cards
					darker: '#121316'  // Darker bg for contrasts
				},
				// Surface colors for cards and elevated elements
				surface: {
					DEFAULT: '#252629',
					hover: '#2F3033',
					active: '#34353A'
				},
				// Accent colors
				accent: {
					DEFAULT: '#FFB703', // Golden yellow for special elements
					light: '#FFC833',
					dark: '#CC9200'
				},
				// Text colors
				content: {
					DEFAULT: '#E5E7EB', // Primary text
					muted: '#9CA3AF',   // Secondary text
					subtle: '#6B7280'    // Disabled/subtle text
				}
			}
		}
	},

	plugins: [flowbite]
} satisfies Config;
