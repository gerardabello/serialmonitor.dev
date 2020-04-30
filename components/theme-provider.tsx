import React from 'react'
import { ThemeProvider as SCThemeProvider } from 'styled-components'

export type Theme = {
  backgroundColor: string;
  textColor: string;
  highlightColor: string;
  lightColor: string;
  focusColor: string;
  children: JSX.Element;
}

const ThemeProvider: React.FunctionComponent<Theme> = ({
  children,
  backgroundColor,
  textColor,
  highlightColor,
  lightColor,
  focusColor,
}) => {
  return (
    <SCThemeProvider
      theme={{
        backgroundColor,
        textColor,
        highlightColor,
        lightColor,
        focusColor,
      }}
    >
      {children}
    </SCThemeProvider>
  )
}

export default ThemeProvider
