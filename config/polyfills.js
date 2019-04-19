export const polyfillsServ = () => {
  require('intl')
  require('intl/locale-data/jsonp/en.js')
  require('intl/locale-data/jsonp/ru.js')
  require('intl/locale-data/jsonp/ru-RU.js')
}

export const polyfills = {
  dev: [
    'intl',
    'intl/locale-data/jsonp/en.js',
    'intl/locale-data/jsonp/ru.js',
    'intl/locale-data/jsonp/ru-RU.js',
    'eventsource-polyfill',
    '@babel/polyfill',
    'react-hot-loader/patch',
    'webpack-hot-middleware/client?quiet:true'
  ],
  devWDS: [
    'intl',
    'intl/locale-data/jsonp/en.js',
    'intl/locale-data/jsonp/ru.js',
    'intl/locale-data/jsonp/ru-RU.js',
    'eventsource-polyfill',
    '@babel/polyfill',
    'react-hot-loader/patch'
  ],
  prod: [
    'intl',
    'intl/locale-data/jsonp/en.js',
    'intl/locale-data/jsonp/ru.js',
    'intl/locale-data/jsonp/ru-RU.js',
    'eventsource-polyfill',
    '@babel/polyfill'
  ],
  server: ['@babel/polyfill']
}
