import { resolve } from "path";
import { defineConfig } from "vite";

export default defineConfig({
    build: {
        rollupOptions: {
            input: {
                main: resolve(__dirname, "index.html"),
                about: resolve(__dirname, "src/pages/about.html"),
                cart: resolve(__dirname, "src/pages/cart.html"),
                login: resolve(__dirname, "src/pages/login.html"),
                payment: resolve(__dirname, "src/pages/payment.html"),
                register: resolve(__dirname, "src/pages/register.html"),
                not_found: resolve(__dirname, "src/pages/404.html"),
                internal_error: resolve(__dirname, "src/pages/500.html"),
                privacy: resolve(__dirname, "src/pages/privacy.html"),
            },
        },
    },
});
