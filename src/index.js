import React from 'react'
import ReactDOM from 'react-dom'
import styled, { createGlobalStyle } from 'styled-components'

import App from './app'

const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
    -webkit-tap-highlight-color: rgba(0,0,0,0);
    -webkit-tap-highlight-color: transparent;
  }

  a {
    text-decoration: none;
  }
`

const Root = styled.div`
  height: 100%;
`

export function mount(node) {
  ReactDOM.render(
    <Root>
      <GlobalStyle />
      <App />
    </Root>,
    node
  )
}

mount(document.getElementById('root'))
