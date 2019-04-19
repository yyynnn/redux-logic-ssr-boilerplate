import * as React from 'react'
import { render, hydrate } from 'react-dom'
import root from 'window-or-global'

import { Root } from './client/Root'

const APP_ID = process.env.APP_ID
const IS_SSR = process.env.IS_SSR
const element = root.document.getElementById(APP_ID)

if (!+IS_SSR) {
  // eslint-disable-next-line no-console
  console.log('app rendered')
  render(<Root />, element)
} else {
  hydrate(<Root />, element)
  // eslint-disable-next-line no-console
  console.log('app hydrated')
}
