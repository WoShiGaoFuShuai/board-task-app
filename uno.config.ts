import presetIcons from '@unocss/preset-icons';
import presetWind4 from '@unocss/preset-wind4';
import { defineConfig } from 'unocss';

export default defineConfig({
	presets: [presetWind4(), presetIcons()],

	// Trigger CSS variable generation for colors used only in <style scoped>
	safelist: ['bg-depth-1', 'text-surface-400'],

	theme: {
		colors: {
			// Primary — ClickUp-inspired purple
			primary: {
				50: '#f5f3ff',
				100: '#ede9fe',
				200: '#ddd6fe',
				300: '#c4b5fd',
				400: '#a78bfa',
				500: '#7c3aed',
				600: '#6d28d9',
				700: '#5b21b6',
				800: '#4c1d95',
				900: '#3b0764',
			},
			// Neutral — warm grays (Apple HIG feel)
			surface: {
				50: '#fafafa',
				100: '#f5f5f5',
				200: '#eeeeee',
				300: '#e0e0e0',
				400: '#bdbdbd',
				500: '#9e9e9e',
				600: '#757575',
				700: '#616161',
				800: '#424242',
				900: '#212121',
			},
			// Dark end of surface (sidebar, modals, overlays)
			depth: {
				1: '#1e1f21',
				2: '#2a2b2e',
				3: '#35363a',
			},
			// Semantic
			success: '#34c759',
			warning: '#ff9f0a',
			danger: '#ff3b30',
			info: '#007aff',
		},
		borderRadius: {
			sm: '6px',
			DEFAULT: '8px',
			md: '10px',
			lg: '12px',
			xl: '16px',
		},
		boxShadow: {
			sm: '0 1px 2px rgba(0, 0, 0, 0.06)',
			DEFAULT: '0 1px 3px rgba(0, 0, 0, 0.08), 0 1px 2px rgba(0, 0, 0, 0.04)',
			md: '0 4px 6px rgba(0, 0, 0, 0.07), 0 2px 4px rgba(0, 0, 0, 0.04)',
			lg: '0 10px 15px rgba(0, 0, 0, 0.08), 0 4px 6px rgba(0, 0, 0, 0.04)',
		},
		fontFamily: {
			sans: ['Inter', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
		},
	},
});
