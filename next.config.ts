import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // typescript: {
  //   // !! WARN !!
  //   // Dangerously allow production builds to successfully complete even if
  //   // your project has type errors.
  //   // !! WARN !!
  //   ignoreBuildErrors: true
  // },
  // webpack: (config) => {
  //   config.module.rules.push({
  //     test: /\.(tsx|ts|js|jsx)$/,
  //     exclude: /node_modules/,
  //     use: {
  //       loader: "babel-loader",
  //       options: {
  //         presets: ["next/babel"],
  //         plugins: ["babel-plugin-relay"]
  //       }
  //     }
  //   });
  //   return config;
  // },
  compiler: {
    relay: {
      src: "./",
      language: "typescript",
    },
  },
};

export default nextConfig;
