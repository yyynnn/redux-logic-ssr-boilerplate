import { createLogic } from 'redux-logic'
import Cookies from 'universal-cookie'

import { exampleActions } from './reducer'

const cookies = new Cookies()

const example = createLogic({
  type: exampleActions.exampleAction().type,
  latest: true,
  debounce: 200,
  process({ action }, dispatch, done) {
    // eslint-disable-next-line no-console
    console.log('DO THE LOGIC')
    done()
  }
})

export const exampleLogic = [example]
