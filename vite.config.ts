import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';
import { resolve } from 'path';

export default defineConfig({
	plugins: [
		// Плагин для React
		react(),
		// Поддержка путей из tsconfig (для @ алиасов)
		tsconfigPaths()
	],
	resolve: {
		alias: {
			'@': resolve(__dirname, './src')
		}
	},
	server: {
		port: 3000,
		// Настройка прокси для API и WebSocket
		proxy: {
			'/api': {
				target: 'http://localhost:8080',
				changeOrigin: true,
				secure: false,
			},
			'/ws': {
				target: 'ws://localhost:8080',
				ws: true,
			}
		}
	},
	build: {
		sourcemap: true,
		// Оптимизация бандлов
		rollupOptions: {
			output: {
				manualChunks: {
					'react-vendor': ['react', 'react-dom'],
					'redux-vendor': ['@reduxjs/toolkit', 'react-redux'],
					'router-vendor': ['react-router-dom'],
					'antd-vendor': ['antd', '@ant-design/icons'],
				}
			}
		}
	}
});

// import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react'

// // https://vite.dev/config/
// export default defineConfig({
//   plugins: [react()],
// })
