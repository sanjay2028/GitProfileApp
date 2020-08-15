const { override, fixBabelImports,adjustStyleLoaders } = require('customize-cra');
const rewireSass = require('react-app-rewire-sass-modules');

module.exports = override(
    fixBabelImports('import', {
    libraryName: 'antd',
    libraryDirectory: 'es',
    style: 'css',
    }),adjustStyleLoaders(({ use: [ , css, postcss, resolve, processor ] }) => {
        css.options.sourceMap = true;         // css-loader
        if (processor && processor.loader.includes('sass-loader')) {
          processor.options.sourceMap = true; // sass-loader
        }
      })
);
