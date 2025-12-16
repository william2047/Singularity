import { defineConfig } from "tsup";

export default defineConfig((options) => ({
  format: ["esm", "cjs"],
  sourcemap: true,
  clean: true,
  splitting: false,
  target: "es2020",

  tsconfig: "tsconfig.json",
  dts: true,

  // Allow per-package entry override
  entry: options.entry || ["src/index.ts"],
}));