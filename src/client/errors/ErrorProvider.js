import React from 'react'

const STATUS_CODE_404 = 404
const STATUS_CODE_500 = 500

export const ErrorProvider = ({ errors }) => {
  const actualError = errors.sort(item => (item.get('code') === STATUS_CODE_500 ? -1 : 1)).first()

  const statusCode = actualError.get('code')
  let ErrorPage = null
  switch (statusCode) {
    case STATUS_CODE_404:
      ErrorPage = <div>page404</div>
      break
    case STATUS_CODE_500:
      ErrorPage = <div>page500</div>
      break
    default:
      ErrorPage = <div>page500</div>
  }

  return <ErrorPage />
}
