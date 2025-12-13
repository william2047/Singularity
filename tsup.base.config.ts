import { defineConfig } from "tsup";

export default defineConfig((options) => ({
  format: ["esm", "cjs"],
  dts: true,
  sourcemap: true,
  clean: true,
  splitting: false,
  target: "es2020",

  // Allow per-package entry override
  entry: options.entry || ["src/index.ts"],
}));