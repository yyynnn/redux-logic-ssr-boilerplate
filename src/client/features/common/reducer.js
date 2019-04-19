import { createSymbiote } from 'redux-symbiote'
import { fromJS } from 'immutable'

const namespace = 'common_data'

const initialState = fromJS({ firstRenderPassed: false })

const symbiotes = {
  firstRenderPassed: (state, palyload) => {
    return state.set('firstRenderPassed', palyload)
  }
}

export const { actions: commonActions, reducer: common } = createSymbiote(
  initialState,
  symbiotes,
  namespace
)
