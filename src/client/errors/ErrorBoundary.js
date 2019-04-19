import React from 'react'

// const enhancer = compose(
//   withState('error', 'setError', null),
//   withState('errorInfo', 'setErrorInfo', null),
//   withLifecycle(({ setError, setErrorInfo }) => {
//     return {
//       onDidCatch(error, errorInfo) {
//         setError(error)
//         setErrorInfo(errorInfo)
//       }
//     }
//   })
// )

export const ErrorBoundary = ({ errorInfo, children }) => {
  const ErrorComponent = <div>Error</div>

  return errorInfo ? <ErrorComponent /> : children
}
