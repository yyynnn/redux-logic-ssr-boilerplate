import { combineReducers } from 'redux-immutable'
import { connectRouter } from 'connected-react-router/immutable'

import { example } from 'features/example'
import { errors } from 'client/errors/reducer'
import { common } from 'features/common/reducer'

export const createRootReducer = history =>
  combineReducers({
    errors,
    common,
    example,
    router: connectRouter(history)
  })
