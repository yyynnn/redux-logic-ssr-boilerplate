import * as React from 'react'
import { StyleSheetManager, ThemeProvider } from 'styled-components'
import { Provider } from 'react-redux'
import { StaticRouter } from 'react-router'
import { SizesProvider } from 'react-sizes'

import { App } from 'client/App'

const theme = {}

export const ServerRoot = ({ location, sheet, store, context, sizesConfig }) => (
  <Provider store={store}>
    <StyleSheetManager sheet={sheet}>
      <ThemeProvider theme={theme}>
        <StaticRouter location={location} context={context}>
          <SizesProvider config={sizesConfig}>
            <App />
          </SizesProvider>
        </StaticRouter>
      </ThemeProvider>
    </StyleSheetManager>
  </Provider>
)
