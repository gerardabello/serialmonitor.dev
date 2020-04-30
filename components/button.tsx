import React from 'react'
import styled, { css } from 'styled-components'
import { fontSizes, fontWeights } from './variables'
import { alphaToColor, contrast, noop } from './utils'
import Spacer from './spacer'

type StyledProps = Omit<PropsType, 'children' | 'icon'>

const level0 = css<StyledProps>`
  background-color: ${props =>
    props.highlightColor || props.theme.highlightColor};
  color: ${props =>
    contrast(props.highlightColor || props.theme.highlightColor)};

  box-shadow: #38373321 0px 1px 2px 0px;

  &:hover {
    background-color: ${props =>
      contrast(props.highlightColor || props.theme.highlightColor, 0.05)};
  }

  &:active {
    background-color: ${props =>
      contrast(props.highlightColor || props.theme.highlightColor, 0.15)};
  }

  &:focus {
    box-shadow: ${props => props.backgroundColor || props.theme.backgroundColor}
        0px 0px 0px 2px,
      ${props => props.theme.focusColor} 0px 0px 0px 4px;
  }
`

const level1 = css<StyledProps>`
  background-color: ${props => props.textColor || props.theme.textColor};
  color: ${props => contrast(props.textColor || props.theme.textColor)};

  &:hover {
    background-color: ${props =>
      contrast(props.textColor || props.theme.textColor, 0.05)};
  }

  &:active {
    background-color: ${props =>
      contrast(props.textColor || props.theme.textColor, 0.15)};
  }

  &:focus {
    box-shadow: ${props => props.backgroundColor || props.theme.backgroundColor}
        0px 0px 0px 2px,
      ${props => props.theme.focusColor} 0px 0px 0px 4px;
  }
`

const level2 = css<StyledProps>`
  background-color: transparent;
  color: ${props => props.textColor || props.theme.textColor};

  &:hover {
    background-color: ${props =>
      alphaToColor(
        contrast(props.backgroundColor || props.theme.backgroundColor),
        0.1
      )};
  }

  &:active {
    background-color: ${props =>
      alphaToColor(
        contrast(props.backgroundColor || props.theme.backgroundColor),
        0.2
      )};
  }

  &:focus {
    box-shadow: ${props => props.backgroundColor || props.theme.backgroundColor}
        0px 0px 0px 2px,
      ${props => props.theme.focusColor} 0px 0px 0px 4px;
  }
`

const buttonSmall = css`
  padding: 8px 16px;
  font-size: ${fontSizes.size0}px;
`
const buttonMedium = css`
  padding: 8px 24px;
  font-size: ${fontSizes.size1}px;
`
const buttonLarge = css`
  padding: 8px 32px;
  font-size: ${fontSizes.size2}px;
`

const ButtonWrapper = styled.button<StyledProps>`
  ${props => (props.kind === 'level0' ? level0 : '')};
  ${props => (props.kind === 'level1' ? level1 : '')};
  ${props => (props.kind === 'level2' ? level2 : '')};

  outline: none;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background-color: ${props => props.backgroundColor};
  color: ${props => props.textColor};
  border: none;
  font-family: inherit;
  transition: 0.4s;
  cursor: pointer;
  white-space: nowrap;
  font-weight: ${fontWeights.regular};
  line-height: 1.1;
  border-radius: 4px;

  transition: 0.2s;

  ${props => (props.size === 'small' ? buttonSmall : '')};
  ${props => (props.size === 'medium' ? buttonMedium : '')};
  ${props => (props.size === 'large' ? buttonLarge : '')};

  ${props => (props.fullWidth ? 'width: 100%' : '')};

  ${props => (props.disabled ? `opacity: 0.15; pointer-events: none;` : '')};
`

ButtonWrapper.displayName = 'ButtonWrapper'

type PropsType = {
  kind?: 'level0' | 'level1' | 'level2';
  textColor?: string;
  backgroundColor?: string;
  highlightColor?: string;
  size?: 'small' | 'medium' | 'large';
  fullWidth?: boolean;
  children?: any;
  disabled?: boolean;
  onClick?: () => void;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
  dataQa?: string;
  icon?: any;
}

const Button = ({
  kind = 'level0',
  textColor,
  backgroundColor,
  highlightColor,
  size = 'medium',
  fullWidth = false,
  children,
  disabled = false,
  onClick = noop,
  onMouseEnter = noop,
  onMouseLeave = noop,
  dataQa,
  icon,
}: PropsType): JSX.Element => {
  return (
    <ButtonWrapper
      data-qa={dataQa}
      size={size}
      textColor={textColor}
      backgroundColor={backgroundColor}
      highlightColor={highlightColor}
      fullWidth={fullWidth}
      kind={kind}
      disabled={disabled}
      onClick={onClick}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      {icon}
      {icon ? <Spacer left={1} /> : null}
      {children}
    </ButtonWrapper>
  )
}

export default Button
