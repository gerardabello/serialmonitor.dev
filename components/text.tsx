import styled from 'styled-components'
import { fontSizes, fontWeights } from './variables'
import { withBreakpoint, Breakpoint } from './responsive-provider'

export const availableTextSizes = [
  'size6',
  'size5',
  'size4',
  'size3',
  'size2',
  'size1',
  'size0',
  'sizeN1',
  'sizeN2',
]

export const breakpointToTextSize = (
  textSize = 'size0',
  breakpoint: Breakpoint
) => {
  const index = availableTextSizes.indexOf(textSize)
  const increment = breakpoint === 'sm' ? 1 : 0

  const newSize = Math.min(index + increment, availableTextSizes.length - 1)
  return availableTextSizes[newSize]
}

type PropsType = {
  italics?: boolean;
  inline?: boolean;
  size?: string;
  breakpoint: Breakpoint;
  textAlign?: 'left' | 'center' | 'right';
  fontWeight?: 'regular' | 'bold';
  breakWord?: boolean;
  dimmed?: boolean;
  ellipsis?: boolean;
}

const Text = styled.div<PropsType>`
  ${props => (props.italics ? 'font-style: italic' : '')};
  ${props => (props.inline ? 'display: inline' : '')};
  ${props => (props.breakWord ? 'word-break: break-word' : '')};

  text-align: ${props => props.textAlign};

  ${props =>
    props.size &&
    `
    font-size: ${
      fontSizes[breakpointToTextSize(props.size, props.breakpoint)]
    }px;
    line-height: 1.2;
  `};
  ${props =>
    props.color &&
    `
    color: ${props.color};
  `};
  ${props =>
    props.fontWeight &&
    `
    font-weight: ${fontWeights[props.fontWeight]};
  `};
  ${props =>
    props.dimmed &&
    `
    opacity: 0.6;
  `};
  ${props =>
    props.ellipsis &&
    `white-space: nowrap; overflow: hidden; text-overflow: ellipsis`};

  & > a {
    color: currentColor;
    font-weight: ${fontWeights.bold};
    text-decoration: underline;
  }
`

Text.defaultProps = {
  size: 'size0',
  fontWeight: 'regular',
  textAlign: 'left',
}

export default withBreakpoint(Text)
