/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: false,
  env: {
    BACK_API: process.env.BACK_API,
  },
  webpack(config) {
    config.module.rules.push({
      test: /\.(eot|woff|woff2|ttf|svg|png|jpg|gif)$/,
      use: {
        loader: "url-loader",
        options: {
          limit: 100000,
          name: "[name].[ext]"
        }
      }
    });
    return config;
  },
}
