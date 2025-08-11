import type { Config } from "tailwindcss";
const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: { extend: { fontFamily: { display: ["ui-sans-serif","system-ui"] } } },
  plugins: [],
};
export default config;
