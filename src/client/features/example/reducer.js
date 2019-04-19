import { createSymbiote } from 'redux-symbiote'
import { fromJS } from 'immutable'

const namespace = 'example_namespace'

const initialState = fromJS({ example: 'HOLA EXAMPLE' })

const symbiotes = {
  exampleAction: (state, palyload) => {
    return state.set('example', palyload)
  }
}

export const { actions: exampleActions, reducer: example } = createSymbiote(
  initialState,
  symbiotes,
  namespace
)
