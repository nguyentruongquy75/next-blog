module.exports = {
  reactStrictMode: true,
  crossOrigin: "anonymous",
  webpack: (config, { isServer }) => {
    if (isServer) {
      require("./sitemap-generator");
    }
    return config;
  },
};
