import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/index.ts"],     // Your main entry point
  format: ["esm", "cjs"],      // Build for both import and require
  dts: true,                   // Generate .d.ts files
  splitting: false,            // Libraries shouldn't code-split
  sourcemap: true,
  clean: true,
  target: "es2020"             // Works on modern Node + browsers
});
