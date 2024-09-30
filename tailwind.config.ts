import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        bg: "#F8F9FA",
        // primary: "#007BFF",
        // primary: "#2dd4bf",
        // primary: "#14b8a6",
        primary: "#0d9488",
        secondary: "#3066be",
        disabled: "#A0AEC0",
        dull: "#718096",
        dark: "#2D3748",
        success: "#48BB78",
        fail: "#E53E3E",
        darkinputbg: '#515B60',
        darkinputtext: '#D9DBE1',
        darkbg: "#263238"
      },
      backgroundImage: {
        'radial-gradient': 'radial-gradient(circle, var(--tw-gradient-stops))',
        'conic-gradient': 'conic-gradient(from 0deg, var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [],
};
export default config;
