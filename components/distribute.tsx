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

const Distribute = styled.div<PropsType>`
  display: flex;
  ${props => (props.align ? `align-items: ${ALIGN[props.align]}` : '')};
  ${props =>
    props.position ? `justify-content: ${ALIGN[props.position]}` : ''};

  & > * {
    flex: 0 0 auto;

    &:not(:last-child) {
      ${props =>
        props.vertical
          ? 'margin-bottom:' + (props.space || 0) * 8 + 'px'
          : 'margin-right:' + (props.space || 0) * 8 + 'px'};
    }
  }

  ${props => (props.vertical ? 'flex-direction: column' : '')};
  ${props => (props.flipped ? 'flex-direction: row-reverse' : '')};
`

Distribute.displayName = 'Distribute'

export default Distribute
