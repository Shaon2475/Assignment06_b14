module.exports = {
  content: [
    "./app/**/*.{js,jsx}",
    "./components/**/*.{js,jsx}",
    "./context/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: "#0c0d10",
        dark: "#0f1115",
        panel: "#15171d",
        panel2: "#13161d",
        row: "#14171e",
        line: "#222630",
        line2: "#232732",
        lime: "#ccff00",
        lime2: "#c2f800",
        limebg: "#1a2312",
        muted: "#9ca3af",
        muted2: "#8a92a0",
      },
      fontFamily: {
        display: ["Oswald", "Impact", "sans-serif"],
        sans: ["Inter", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};
