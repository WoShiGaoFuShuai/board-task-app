import vue from '@vitejs/plugin-vue';
import UnoCSS from 'unocss/vite';
import { defineConfig } from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';

// https://vite.dev/config/
export default defineConfig({
	plugins: [vue(), tsconfigPaths({ loose: true }), UnoCSS()],
});
