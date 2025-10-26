import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        fairytale: {
          pink: '#FFE5EC',
          lavender: '#E5D9F2',
          mint: '#D5F4E6',
          peach: '#FFD6A5',
          sky: '#D4E7F5',
        },
      },
    },
  },
  plugins: [],
};

export default config;
