import styled from 'styled-components'
import { colors, fontSizes, lineHeights, fontWeights } from '../variables'
import { breakpointToTextSize } from '../text'
import { withBreakpoint } from '../responsive-provider'

const Input = styled.input`
  background: ${props => props.backgroundColor || props.theme.backgroundColor};
  outline: none;

  border: 2px solid ${props => props.borderColor || props.theme.lightColor};
  border-radius: 4px;
  padding: 6px 12px;

  font-family: inherit;
  line-height: inherit;
  cursor: pointer;
  color: ${props => props.textColor || props.theme.textColor};
  flex: 1;
  font-size: ${props =>
    fontSizes[breakpointToTextSize(props.size, props.breakpoint)]}px;
  line-height: ${props =>
    lineHeights[breakpointToTextSize(props.size, props.breakpoint)]}px;
  font-weight: ${props => fontWeights[props.fontWeight]};
  font-style: ${props => (props.italics ? 'italic' : 'inherit')};
  ${props => (props.fullWidth ? 'width: 100%' : '')};

  &::placeholder {
    color: ${colors.body};
    opacity: 0.2;
  }

  transition: border 0.2s ease;
  &:focus {
    border: 2px solid ${props => props.theme.focusColor};
  }
`

Input.defaultProps = {
  size: 'size0'
}

export default withBreakpoint(Input)
