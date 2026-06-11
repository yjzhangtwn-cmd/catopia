import nextConfig from "eslint-config-next/core-web-vitals";
import nextTypescript from "eslint-config-next/typescript";

const config = [
  { ignores: [".open-next/**", ".wrangler/**", "cloudflare-env.d.ts"] },
  ...Object.values(nextConfig),
  ...Object.values(nextTypescript),
  // beforeInteractive in root layout is valid in App Router; this rule targets Pages Router only
  {
    rules: {
      "@next/next/no-before-interactive-script-outside-document": "off",
    },
  },
];

export default config;
