require('babel-core/register');
if (process.env.NODE_ENV === 'production') {
    require('react/dist/react.min'); // prime cache
    require.cache[require.resolve('react')] = require.cache[require.resolve('react/dist/react.min')];

    require('react-dom/dist/react-dom.min'); // prime cache
    require.cache[require.resolve('react-dom')] = require.cache[require.resolve('react-dom/dist/react-dom.min')];

    require('react-router/umd/ReactRouter.min'); // prime cache
    require.cache[require.resolve('react-router')] = require.cache[require.resolve('react-router/umd/ReactRouter.min')];

    require('node-polyglot/build/polyglot.min'); // prime cache
    require.cache[require.resolve('node-polyglot')] = require.cache[require.resolve('node-polyglot/build/polyglot.min')];
}
require('./server');
