import { defineConfig } from 'vite';
import { fileURLToPath } from 'node:url';

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: fileURLToPath(new URL('./index.html', import.meta.url)),
        rooms: fileURLToPath(new URL('./rooms.html', import.meta.url)),
        room: fileURLToPath(new URL('./room.html', import.meta.url)),
        territory: fileURLToPath(new URL('./territory.html', import.meta.url)),
      },
    },
  },
});
