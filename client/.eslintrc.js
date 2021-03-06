module.exports = {
  root: true,

  parserOptions: {
    parser: 'babel-eslint',
    sourceType: 'module'
  },

  env: {
    browser: true
  },

  extends: [
    'prettier',
    // Uncomment any of the lines below to choose desired strictness,
    // but leave only one uncommented!
    // See https://eslint.vuejs.org/rules/#available-rules
    // 'plugin:vue/essential' // Priority A: Essential (Error Prevention)
    'plugin:vue/strongly-recommended' // Priority B: Strongly Recommended (Improving Readability)
    // 'plugin:vue/recommended' // Priority C: Recommended (Minimizing Arbitrary Choices and Cognitive Overhead)
  ],

  // required to lint *.vue files
  plugins: [
    'vue'
  ],

  globals: {
    'ga': true, // Google Analytics
    'cordova': true,
    '__statics': true,
    'process': true,
    'Capacitor': true,
    'chrome': true
  },

  // add your custom rules here
  rules: {
    'prefer-promise-reject-errors': 'off',
    // allow debugger during development only
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'padding-line-between-statements': [
      'error',
        {
          'blankLine': 'always',
          'prev': '*',
          'next': [
              'block',
              'block-like',
              'cjs-export',
              'class',
              'const',
              'export',
              'import',
              'let',
              'var',
              'return'
          ]
        },
        {
          'blankLine': 'always',
          'prev': [
              'block',
              'block-like',
              'cjs-export',
              'class',
              'const',
              'export',
              'import',
              'let',
              'var',
              'return'
          ],
          'next': '*'
        },
        {
          'blankLine': 'never',
          'prev': ['const', 'let', 'var'],
          'next': ['const', 'let', 'var']
        },
        { 'blankLine': 'any', 'prev': ['export', 'import'], 'next': ['export', 'import'] }
    ],
    'object-curly-spacing': [
      'error',
      'always'
    ]
  } 
}
