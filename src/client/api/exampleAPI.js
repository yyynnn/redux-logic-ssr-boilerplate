import { EXAMPLE_API_URI } from 'constants/index'

export const exampleAPI = data => {
  const request = () =>
    fetch(`${EXAMPLE_API_URI}`, {
      method: 'GET',
      headers: {
        Accept: 'application/json'
      }
    })
  return request()
}
