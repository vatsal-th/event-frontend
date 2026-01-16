/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                'brand-purple': '#8B5CF6', // Lighter purple for gradients
                'brand-dark-purple': '#4C1D95', // Deep purple
                'brand-pink': '#EC4899', // Pink for accents
                'brand-glass': 'rgba(255, 255, 255, 0.1)',
                'brand-glass-border': 'rgba(255, 255, 255, 0.2)',
            },
            fontFamily: {
                sans: ['Satoshi', 'Inter', 'sans-serif'],
            },
            backgroundImage: {
                'hero-gradient': 'linear-gradient(to right, #6d28d9, #ec4899)',
                'glass-gradient': 'linear-gradient(135deg, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.05))',
            }
        },
    },
    plugins: [],
}
