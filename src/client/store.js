import { applyMiddleware, compose, createStore, Store } from 'redux'
import { createLogicMiddleware } from 'redux-logic'
import { routerMiddleware } from 'connected-react-router/immutable'
import { createBrowserHistory, createMemoryHistory } from 'history'
import 'isomorphic-fetch'
import { fromJS, Map } from 'immutable'
import root from 'window-or-global'

import { createRootReducer } from './rootReducer'
import { rootLogic } from './rootLogic'

const IS_DEV = process.env.NODE_ENV === 'development' ? true : false
const IS_CLIENT = !!+process.env.IS_CLIENT
const deps = {}

export const history = IS_CLIENT ? createBrowserHistory() : createMemoryHistory()

export const configureStore = preloadedState => {
  const immutablePreloadedState = preloadedState ? fromJS(preloadedState) : Map()
  const logicMiddleware = createLogicMiddleware(rootLogic, deps)
  const createEnhancer = () => {
    const composeEnhancers =
      IS_CLIENT && IS_DEV ? root.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose : compose

    return composeEnhancers(applyMiddleware(logicMiddleware, routerMiddleware(history)))
  }

  const enhancer = createEnhancer()
  const store = createStore(createRootReducer(history), immutablePreloadedState, enhancer)
  store.logicMiddleware = logicMiddleware

  if (module.hot) {
    module.hot.accept('./rootReducer', () => {
      store.replaceReducer(createRootReducer(history))
    })
  }
  // check store
  root.store = store

  return store
}
