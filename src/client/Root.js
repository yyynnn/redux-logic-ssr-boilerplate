import React from 'react'
import { Provider } from 'react-redux'
import { ConnectedRouter } from 'connected-react-router/immutable'
import root from 'window-or-global'

import { App } from './App'
import { configureStore, history } from './store'

require('assets/favicons/favicon-32x32.png')
require('assets/favicons/favicon-16x16.png')
require('assets/favicons/favicon.ico')

const dataAttrib = +process.env.IS_SSR
  ? root.document.getElementById('redux_initial_state').getAttribute('data-json')
  : null
const initialData = +process.env.IS_SSR ? JSON.parse(decodeURIComponent(dataAttrib)) : null

export const store = configureStore(initialData)

export const Root = () => (
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <App />
    </ConnectedRouter>
  </Provider>
)
