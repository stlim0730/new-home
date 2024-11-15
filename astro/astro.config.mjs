import { defineConfig } from 'astro/config';
import icon from "astro-icon";

// https://astro.build/config
export default defineConfig({
	server: {
		port: Number(process.env.PORT),
		host: true,
	},
	integrations: [icon({
		iconDir: "src/assets/icons",
	})],
});
