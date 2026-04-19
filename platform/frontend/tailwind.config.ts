import type { Config } from "tailwindcss";

export default {
  theme: {
    extend: {
      colors: {
        orange: {
          50: "#fff1e6",
          100: "#ffd8b3",
          200: "#ffb580",
          300: "#ff9252",
          400: "#ff6a24",
          500: "#ff4500",
          600: "#e63b00",
          700: "#b53300",
          800: "#7f2700",
          900: "#4c1800",
        },
      },
    },
  },
} satisfies Config;
