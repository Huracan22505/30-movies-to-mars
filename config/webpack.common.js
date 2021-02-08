const paths = require('./paths');
const HtmlWebpackPartialsPlugin = require('html-webpack-partials-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
new HtmlWebpackPlugin({ favicon: 'src/images/favicon.png' });

module.exports = {
  // Where webpack looks to start building the bundle
  entry: {
    index: [paths.src + '/index/index.js'],
    library: [paths.src + '/library/library.js'],
    aboutUs: [paths.src + '/aboutUs/aboutUs.js'],
  },
  // Where webpack outputs the assets and bundles
  output: {
    path: paths.build,
    filename: '[name].js',
    publicPath: '/',
  },

  // Customize the webpack build process
  plugins: [
    // Removes/cleans build folders and unused assets when rebuilding
    new CleanWebpackPlugin(),

    // Generates an HTML file from a template
    // Generates deprecation warning: https://github.com/jantimon/html-webpack-plugin/issues/1501
    new HtmlWebpackPlugin({
      chunks: ['index'],
      template: paths.src + '/index/index.html', // template file
      filename: 'index.html', // output file
    }),
    new HtmlWebpackPlugin({
      // inject: false,
      chunks: ['aboutUs'],
      template: paths.src + '/aboutUs/aboutUs.html', // template file
      filename: 'aboutUs.html', // output file
    }),

    new HtmlWebpackPlugin({
      // inject: false,
      chunks: ['library'],
      template: paths.src + '/library/library.html', // template file
      filename: 'library.html', // output file
    }),
  ],

  // Determine how modules within the project are treated
  module: {
    rules: [
      // JavaScript: Use Babel to transpile JavaScript files
      { test: /\.js$/, exclude: /node_modules/, use: ['babel-loader'] },

      // Styles: Inject CSS into the head with source maps
      {
        test: /\.(scss|css)$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: { sourceMap: true, importLoaders: 1 },
          },
          { loader: 'postcss-loader', options: { sourceMap: true } },
          { loader: 'sass-loader', options: { sourceMap: true } },
        ],
      },

      //Templates:
      {
        test: /\.hbs$/,
        use: 'handlebars-loader',
      },

      // Images: Copy image files to build folder
      // { test: /\.(?:ico|gif|png|jpg|jpeg)$/i, type: "asset/resource" },
      {
        test: /\.(ico|gif|webp|png|jpe?g)$/i,
        use: [
          {
            loader: 'url-loader',
            options: {
              name: 'images/[name].[ext]',
              limit: 8192,
              esModule: false,
            },
          },
          'img-loader',
        ],
        // type: "asset/resource",
      },
      // Fonts and SVGs: Inline files
      { test: /\.(woff(2)?|eot|ttf|otf|svg)$/, type: 'asset/inline' },
      {
        test: /\.html$/,
        use: 'html-loader',
      },
    ],
  },
};
