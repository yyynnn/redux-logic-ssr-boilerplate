import React, { useEffect, useState } from 'react'
import styled from 'styled-components'

export const Example = () => {
  const [client, setEnv] = useState(false)

  useEffect(() => {
    setEnv(true)
  })
  return (
    <Wrapper>
      Hello human!
    </Wrapper>
  )
}

const Wrapper = styled.div`
  font-family: sans-serif;
  display: grid;
  height: 100vh;
  width: 100%;
  justify-items: center;
  align-items: center;
`
