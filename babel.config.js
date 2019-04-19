'use strict'

module.exports = function(api) {
  api.cache(true)
  return {
    presets: [
      '@babel/preset-react',
      [
        '@babel/preset-env',
        {
          modules: false,
          targets: {
            browsers: ['last 4 versions']
          }
        }
      ]
    ],
    plugins: [
      '@babel/plugin-transform-modules-commonjs',
      '@babel/plugin-proposal-object-rest-spread',
      '@babel/plugin-proposal-class-properties',
      '@babel/plugin-syntax-dynamic-import',
      [
        'styled-components',
        {
          ssr: true
        }
      ],
      [
        'module-resolver',
        {
          extensions: ['.js', '.jsx'],
          root: ['./'],
          alias: {
            features: ['./src/client/features'],
            api: ['./src/client/api'],
            assets: ['./src/client/assets'],
            client: ['./src/client'],
            src: ['./src'],
            constants: ['./src/client/constants'],
            hooks: ['./src/client/hooks'],
            config: ['./config']
          }
        }
      ]
    ]
  }
}
