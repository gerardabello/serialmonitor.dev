import React from 'react'
import PropTypes from 'prop-types'
import styled, { css } from 'styled-components'
import Color from 'color'
import variables from '../variables'
import { xxxtransparent, alphaToColor, contrast } from '../utils'
import Spacer from '../spacer'

const level0 = css`
  background-color: ${props => props.highlightColor || props.theme.highlightColor};
  color: ${props => contrast(props.highlightColor || props.theme.highlightColor)};

  box-shadow: #38373321 0px 1px 2px 0px;

  &:hover {
  background-color: ${props => contrast(props.highlightColor || props.theme.highlightColor, 0.05)};
  }

  &:active {
  background-color: ${props => contrast(props.highlightColor || props.theme.highlightColor, 0.15)};
  }

  &:focus {
    box-shadow: ${props => props.backgroundColor || props.theme.backgroundColor} 0px 0px 0px 2px, ${props => props.theme.focusColor} 0px 0px 0px 4px;
  }
`

const level1 = css`
  background-color: ${props => props.textColor || props.theme.textColor};
  color: ${props => contrast(props.textColor || props.theme.textColor)};


  &:hover {
  background-color: ${props => contrast(props.textColor || props.theme.textColor, 0.05)};
  }

  &:active {
  background-color: ${props => contrast(props.textColor || props.theme.textColor, 0.15)};
  }

  &:focus {
    box-shadow: ${props => props.backgroundColor || props.theme.backgroundColor} 0px 0px 0px 2px, ${props => props.theme.focusColor} 0px 0px 0px 4px;
  }
`

const level2 = css`
  background-color: transparent;
  color: ${props => props.textColor || props.theme.textColor};

  &:hover {
    background-color: ${props => alphaToColor(contrast(props.backgroundColor || props.theme.backgroundColor), 0.1)};
  }

  &:active {
    background-color: ${props => alphaToColor(contrast(props.backgroundColor || props.theme.backgroundColor), 0.2)};
  }

  &:focus {
    box-shadow: ${props => props.backgroundColor || props.theme.backgroundColor} 0px 0px 0px 2px, ${props => props.theme.focusColor} 0px 0px 0px 4px;
  }
`

const buttonIcon = css`
  height: 44px;
  width: 44px;
  border-radius: 50%;
  font-size: ${variables.fontSizes.size0}px;
`

const buttonSmall = css`
  padding: 8px 16px;
  font-size: ${variables.fontSizes.size0}px;
`
const buttonMedium = css`
  padding: 8px 24px;
  font-size: ${variables.fontSizes.size1}px;
`
const buttonLarge = css`
  padding: 8px 32px;
  font-size: ${variables.fontSizes.size2}px;
`

const ButtonWrapper = styled.button`
  ${props => (props.type === 'level0' ? level0 : '')};
  ${props => (props.type === 'level1' ? level1 : '')};
  ${props => (props.type === 'level2' ? level2 : '')};

  outline: none;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background-color: ${props => props.backgroundColor};
  color: ${props => props.contentColor};
  border: none;
  font-family: inherit;
  transition: 0.4s;
  cursor: pointer;
  white-space: nowrap;
  font-weight: ${variables.fontWeights.normal};
  line-height: 1.1;
  border-radius: 4px;

  transition: 0.2s;

  ${props => (props.size === 'icon' ? buttonIcon : '')};
  ${props => (props.size === 'small' ? buttonSmall : '')};
  ${props => (props.size === 'medium' ? buttonMedium : '')};
  ${props => (props.size === 'large' ? buttonLarge : '')};

  ${props => (props.fullWidth ? 'width: 100%' : '')};

  ${props => (props.disabled ? `opacity: 0.15; pointer-events: none;` : '')};
`

ButtonWrapper.displayName = 'ButtonWrapper'

export const availableSizes = ['large', 'medium', 'small', 'icon']

const Button = ({
  type,
  contentColor,
  backgroundColor,
  size,
  fullWidth,
  children,
  disabled,
  onClick,
  onMouseEnter,
  onMouseLeave,
  dataQa,
  icon
}) => {
  return (
    <ButtonWrapper
      data-qa={dataQa}
      size={size}
      contentColor={contentColor}
      backgroundColor={backgroundColor}
      fullWidth={fullWidth}
      type={type}
      disabled={disabled}
      onClick={onClick}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}>
      {icon}
      {icon ? <Spacer left={1} /> : null}
      {children}
    </ButtonWrapper>
  )
}

Button.propTypes = {
  size: PropTypes.oneOf(availableSizes),
  contentColor: PropTypes.string,
  dataQa: PropTypes.string,
  backgroundColor: PropTypes.string,
  fullWidth: PropTypes.bool,
  type: PropTypes.oneOf(['level0', 'level1', 'level2']),
  disabled: PropTypes.bool,
  onClick: PropTypes.func,
  onMouseEnter: PropTypes.func,
  onMouseLeave: PropTypes.func,
  children: PropTypes.node,
  icon: PropTypes.node
}

Button.defaultProps = {
  size: 'medium',
  fullWidth: false,
  type: 'level0',
  disabled: false,
  onClick: () => {},
  onMouseEnter: () => {},
  onMouseLeave: () => {},
  icon: null
}

export default Button
