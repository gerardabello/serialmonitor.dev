import styled from 'styled-components'

const ALIGN = {
  start: 'flex-start',
  center: 'center',
  end: 'flex-end',
}

type PropsType = {
  align?: 'start' | 'center' | 'end';
  position?: 'start' | 'center' | 'end';
  space?: number;
  vertical?: boolean;
  flipped?: boolean;
}

const Spread = styled.div<PropsType>`
  display: flex;
  justify-content: space-between;
  align-items: ${props => ALIGN[props.align || 'start']};
  ${props => (props.vertical ? 'height: 100%' : '')};
  ${props => (props.vertical ? 'flex-direction: column' : '')};

  & > *:not(:last-child) {
    ${props => (props.space ? `margin-right: ${props.space * 8}px` : '')};
  }
`
Spread.displayName = 'Spread'
export default Spread
