import { createSymbiote } from 'redux-symbiote'
import { fromJS, Map } from 'immutable'

const namespace = 'app'
const initialState = fromJS({})

const symbiotes = {
  fail: state => state,
  failComplete: (state, data) => {
    const { reducerName, error } = data
    return state.set(reducerName, fromJS(error))
  },
  reset: () => fromJS({})
}

export const { actions: errorActions, reducer: errors } = createSymbiote(
  initialState,
  symbiotes,
  namespace
)
