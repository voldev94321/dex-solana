const getCacheIdentifier = require('react-dev-utils/getCacheIdentifier');
const webpack = require('webpack')
module.exports = function override(config, webpackEnv) {
    config.resolve.fallback = {
        ...config.resolve.fallback, // This will spread the existing fallbacks, in case there are any
        crypto: require.resolve('crypto-browserify'),
        stream: require.resolve('stream-browserify'),
        http: require.resolve('stream-http'),
        https: require.resolve('https-browserify'),
        zlib: require.resolve('browserify-zlib'),
        url: require.resolve('url/'),
        buffer: require.resolve("buffer"),
       // path: require.resolve("path-browserify"),
        process: require.resolve("process"),
        'process/browser': require.resolve('process/browser')
    };
    
    const shouldUseSourceMap = process.env.GENERATE_SOURCEMAP !== 'false';
    const isEnvDevelopment = webpackEnv === 'development';
    const isEnvProduction = webpackEnv === 'production';
    const loaders = config.module.rules[1].oneOf;

    loaders.splice(loaders.length - 1, 0, {
        test: /\.(js|mjs|cjs)$/,
        exclude: /@babel(?:\/|\\{1,2})runtime/,
        loader: require.resolve('babel-loader'),
        options: {
          babelrc: false,
          configFile: false,
          compact: false,
          presets: [
            [
              require.resolve('babel-preset-react-app/dependencies'),
              { helpers: true },
            ],
          ],
          cacheDirectory: true,
          // See #6846 for context on why cacheCompression is disabled
          cacheCompression: false,
          // @remove-on-eject-begin
          cacheIdentifier: getCacheIdentifier(
            isEnvProduction
              ? 'production'
              : isEnvDevelopment && 'development',
            [
              'babel-plugin-named-asset-import',
              'babel-preset-react-app',
              'react-dev-utils',
              'react-scripts',
            ]
          ),
          // @remove-on-eject-end
          // Babel sourcemaps are needed for debugging into node_modules
          // code.  Without the options below, debuggers like VSCode
          // show incorrect code and set breakpoints on the wrong lines.
          sourceMaps: shouldUseSourceMap,
          inputSourceMap: shouldUseSourceMap,
        },
      });

    config.plugins =[
      // Work around for Buffer is undefined:
        // https://github.com/webpack/changelog-v5/issues/10
        ...config.plugins,
        new webpack.ProvidePlugin({
            Buffer: ['buffer', 'Buffer'],
        }),
        new webpack.ProvidePlugin({
            process: 'process/browser',
        }),
    ]
    
    // config.module.rules.unshift({
    //   test: /\.m?js$/,
    //   resolve: {
    //     fullySpecified: false, // disable the behavior
    //   },
    // });

    return config;
}