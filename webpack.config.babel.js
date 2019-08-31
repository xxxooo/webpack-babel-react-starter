import HtmlWebPackPlugin from 'html-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import { CleanWebpackPlugin } from 'clean-webpack-plugin';
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer';

export default (env, argv) => {
  const isDevelopment = argv.mode === 'development';
  const isProduction = argv.mode === 'production';

  const scriptLoader = {
    test: /\.(js|jsx)$/,
    exclude: /node_modules/,
    use: {
      loader: 'babel-loader',
    },
  };

  const styleLoader = {
    test: /\.(sa|sc|c)ss$/,
    use: [
      {
        loader: MiniCssExtractPlugin.loader,
        options: {
          publicPath: '../',
          hmr: isDevelopment,
        },
      },
      'css-loader',
      'sass-loader',
    ],
  };

  const urlLoader = {
    test: /\.(png|jpe?g|gif|svg)$/i,
    use: [
      {
        loader: 'url-loader',
        options: {
          limit: 8192,
          outputPath: 'images',
          name: '[name]-[contenthash:6].[ext]',
        },
      },
    ],
  };

  const templateLoader = {
    test: /\.html$/,
    use: [
      {
        loader: 'html-loader',
      },
    ],
  };

  const config = {
    output: {
      filename: '[name]-[contenthash:6].js',
    },
    devtool: isDevelopment && 'source-map',
    module: {
      rules: [
        scriptLoader,
        styleLoader,
        urlLoader,
        templateLoader,
      ],
    },
    resolve: {
      extensions: ['.js', '.jsx', '.json'],
    },
    plugins: [
      new HtmlWebPackPlugin({
        template: './src/index.html',
        filename: './index.html',
      }),
      new MiniCssExtractPlugin({
        filename: 'css/[name]-[contenthash:6].css',
      }),
    ],
  };

  if (isProduction) {
    // Clean dist folder
    config.plugins.unshift(new CleanWebpackPlugin());
    // Add bundle analyzer
    config.plugins.push(new BundleAnalyzerPlugin({
      analyzerMode: 'static',
      reportFilename: './bundleAnalyzer/report.html',
    }));
  }

  return config;
};
