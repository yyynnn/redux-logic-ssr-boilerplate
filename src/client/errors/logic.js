import { createLogic } from 'redux-logic'

import { errorActions } from './reducer'
import { ErrorProvider } from './ErrorProvider'

const error = createLogic({
  type: errorActions.fail().type,
  latest: true,
  process({ action: { payload }, getState }, dispatch, done) {
    const isErrorsIgnore = !!getState().getIn([payload.reducerName, 'isErrorsIgnore'])
    const errorProvider = new ErrorProvider(payload.error).setOptions({
      ignore: isErrorsIgnore
    })

    const errorData = {
      reducerName: payload.reducerName,
      error: errorProvider.info
    }
    dispatch(errorActions.failComplete(errorData))
    done()
  }
})

export const errorLogic = [error]
