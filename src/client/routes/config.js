import React from 'react'
import { Route, Switch } from 'react-router'

import { MAIN } from './names'

import { Example } from 'client/features/example/molecules/Example/Example'
import { NotFound } from 'client/features/notFound/notFound'

export const RoutesConfig = () => (
  <Switch>
    <Route exact={true} path={MAIN} component={Example} />
    <Route component={NotFound} />
  </Switch>
)
