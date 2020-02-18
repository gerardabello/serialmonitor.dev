import styled, { css } from 'styled-components'
import { colors } from './variables'

const styles = {
  default: css`
    box-shadow: #00000033 0 1px 2px;
    background: ${colors.grey2};
    border-radius: 4px;
  `,
  subtle: css`
    box-shadow: ${colors.grey3} 0 0 0 2px;
    border-radius: 4px;
  `
}

export default styled.div`
  ${props => styles[props.type || 'default']}
  width: 100%;
  display: flex;
  flex-direction: column;
  transition: all 0.15s ease;

  ${props =>
    props.hoverable
      ? `
        &:hover {
          background: #e4e4e4;
          box-shadow: #00000033 0 2px 4px -1px;
        }
        `
      : ''};
`
