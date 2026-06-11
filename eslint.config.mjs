import nextConfig from "eslint-config-next/core-web-vitals";
import nextTypescript from "eslint-config-next/typescript";

const config = [
  { ignores: [".open-next/**", "cloudflare-env.d.ts"] },
  ...Object.values(nextConfig),
  ...Object.values(nextTypescript),
];

export default config;
