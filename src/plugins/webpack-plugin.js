module.exports = function (_, { id, ...options }) {
  return {
    name: "webpack-plugin",
    configureWebpack(_, isServer, utils) {
      const { getStyleLoaders } = utils;
      const isProd = process.env.NODE_ENV === "production";
      return {
        resolve: {
          fallback: {
            fs: false,
            util: require.resolve("util/"),
          },
        },
        module: {
          rules: [
            {
              test: /\.s[ca]ss$/,
              oneOf: [
                {
                  test: /\.module\.s[ca]ss$/,
                  use: [
                    ...getStyleLoaders(isServer, {
                      modules: {
                        localIdentName: isProd
                          ? `[local]_[hash:base64:4]`
                          : `[local]_[path][name]`,
                        exportOnlyLocals: isServer,
                      },
                      importLoaders: 2,
                      sourceMap: !isProd,
                    }),
                    {
                      loader: "sass-loader",
                      options: options || {},
                    },
                  ],
                },
                {
                  use: [
                    ...getStyleLoaders(isServer),
                    {
                      loader: "sass-loader",
                      options: options || {},
                    },
                  ],
                },
              ],
            },
          ],
        },
      };
    },
  };
};
