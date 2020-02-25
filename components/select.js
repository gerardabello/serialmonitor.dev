import styled from 'styled-components'
import { contrast } from './utils'

export const Select = styled.select`
  display: block;
  font-size: 16px;
  font-family: inherit;

  background-color: ${props => props.textColor || props.theme.textColor};
  color: ${props => contrast(props.textColor || props.theme.textColor)};

  line-height: 1.1;
  padding: 8px 12px;
  ${props => props.fullWidth && `width: 100%;`}
  max-width: 100%;
  margin: 0;
  border: none;
  border-radius: 4px;
  -moz-appearance: none;
  -webkit-appearance: none;
  appearance: none;
  text-align: center;

  background-image: url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22${props =>
    contrast(
      props.textColor || props.theme.textColor
    )}%22%20d%3D%22M287%2069.4a17.6%2017.6%200%200%200-13-5.4H18.4c-5%200-9.3%201.8-12.9%205.4A17.6%2017.6%200%200%200%200%2082.2c0%205%201.8%209.3%205.4%2012.9l128%20127.9c3.6%203.6%207.8%205.4%2012.8%205.4s9.2-1.8%2012.8-5.4L287%2095c3.5-3.5%205.4-7.8%205.4-12.8%200-5-1.9-9.2-5.5-12.8z%22%2F%3E%3C%2Fsvg%3E');

  background-repeat: no-repeat, repeat;
  background-position: right 0.7em top 50%, 0 0;
  background-size: 0.65em auto, 100%;

  &::-ms-expand {
    display: none;
  }

  &:hover {
  background-color: ${props =>
    contrast(props.textColor || props.theme.textColor, 0.05)};
  }

  &:focus {
    box-shadow: ${props => props.backgroundColor || props.theme.backgroundColor}
        0px 0px 0px 2px,
      ${props => props.theme.focusColor} 0px 0px 0px 4px;
    outline: none;
  }
`

export const Option = styled.option`
  font-weight: normal;
`
