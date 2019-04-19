import * as React from 'react'
import { renderToString } from 'react-dom/server'
import Helmet from 'react-helmet'
import { ServerStyleSheet } from 'styled-components'
import asyncHandler from 'express-async-handler'
import MobileDetect from 'mobile-detect'
import uniqid from 'uniqid'

import { renderHTML } from '../templates/renderHTML'
import { render500 } from '../templates/render500'
import { ServerRoot } from '../templates/ServerRoot'

import { ssrCreateStore } from './store'
import { getSizesFallback } from './sizes'

import { commonActions } from 'src/client/features/common/reducer'

const IS_PROD = process.env.NODE_ENV === 'production'
const baseApiUri = IS_PROD ? process.env.BASE_API : process.env.DEV_BASE_API
const IS_SSR = !!+process.env.IS_SSR
const buildId = `webpack_build_${uniqid()}`
const context = {}

export const renderer = asyncHandler(async (req, res) => {
  if (IS_SSR) {
    try {
      const sheet = new ServerStyleSheet()
      const store = ssrCreateStore(req)

      const rootFirstRender = (
        <ServerRoot
          sizesConfig={getSizesFallback(req.headers['user-agent'])}
          location={req.url}
          sheet={sheet.instance}
          store={store}
          context={context}
        />
      )
      renderToString(rootFirstRender) // wastefull render for ssr to work

      // and wait for redux-logic to finish
      await store.logicMiddleware.whenComplete(() => {
        const storeState = store.getState()
        const preloadedState = encodeURIComponent(JSON.stringify(storeState))
        const sizesConfig = getSizesFallback(req.headers['user-agent'])
        const IS_SHITTY = new MobileDetect(req.headers['user-agent']).match('Trident')

        const root = (
          <ServerRoot
            sizesConfig={sizesConfig}
            location={req.url}
            sheet={sheet.instance}
            store={store}
            context={context}
          />
        )

        const html = renderToString(root)
        const styleTags = sheet.getStyleTags()
        const helmetContent = Helmet.renderStatic()
        const meta = `
        ${helmetContent.meta.toString()}
        ${helmetContent.title.toString()}
        ${helmetContent.link.toString()}
      `.trim()

        store.dispatch(commonActions.firstRenderPassed(true)) // detect first render ONLY in server

        res.status(200).send(
          renderHTML({
            html,
            styleTags,
            preloadedState,
            meta,
            baseApiUri,
            IS_SHITTY,
            buildId
          })
        )
      })
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log('error', error)
      res.status(500).send(render500({ error, buildId }))
    }
  } else {
    try {
      res.status(200).send(renderHTML({ baseApiUri, buildId }))
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log('error', error)
      res.status(500).send(render500({ error, buildId }))
    }
  }
})
