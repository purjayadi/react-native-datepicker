import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/index.tsx"],
  format: ["cjs", "esm"],
  dts: true,
  splitting: false,
  sourcemap: false, // Disable sourcemaps for smaller package size
  clean: true,
  minify: true, // Enable minification
  treeshake: true, // Enable tree-shaking
  external: [
    "react",
    "react-native",
    "@gorhom/bottom-sheet",
    "date-fns",
    "react-native-wheel-scrollview-picker",
    "react-native-safe-area-context",
  ],
});
