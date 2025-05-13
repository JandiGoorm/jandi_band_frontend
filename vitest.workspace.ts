import path from "node:path";
import { fileURLToPath } from "node:url";

import { defineWorkspace } from "vitest/config";

import { storybookTest } from "@storybook/experimental-addon-test/vitest-plugin";

// Node.js ESM 환경에서 __dirname 대체
const __filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(__filename);

// More info at: https://storybook.js.org/docs/writing-tests/test-addon
export default defineWorkspace([
  "vite.config.ts",
  {
    extends: "vite.config.ts",
    plugins: [
      // The plugin will run tests for the stories defined in your Storybook config
      // See options at: https://storybook.js.org/docs/writing-tests/test-addon#storybooktest
      storybookTest({ configDir: path.join(dirname, ".storybook") }),
    ],
    test: {
      name: "storybook",
      browser: {
        enabled: true,
        headless: true,
        name: "chromium",
        provider: "playwright",
      },
      setupFiles: [".storybook/vitest.setup.ts"],
    },
  },
]);
