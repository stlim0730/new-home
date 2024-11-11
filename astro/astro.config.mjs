import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
	server: {
		port: Number(process.env.PORT),
		host: true,
	}
});
