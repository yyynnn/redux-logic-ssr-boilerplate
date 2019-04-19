import React from 'react'
import { ThemeProvider } from 'styled-components'
import { Normalize } from 'styled-normalize'
import { hot } from 'react-hot-loader/root'

import { RoutesConfig as Routes } from './routes/config'
import { GlobalStyles } from './styles/global'

import { ErrorBoundary } from 'src/client/errors/ErrorBoundary'

const theme = {}

export const App = hot(() => {
  return (
    <ThemeProvider theme={theme}>
      <React.Fragment>
        <UIstyles />
        <GlobalStyles />
        <Normalize />
        <div>
          <ErrorBoundary>
            <Routes />
          </ErrorBoundary>
        </div>
      </React.Fragment>
    </ThemeProvider>
  )
})
