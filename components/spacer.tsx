import styled from 'styled-components'

type PropsType = {
  top?: number
  left?: number
  right?: number
  bottom?: number
  inner?: boolean
}

const Spacer = styled.div<PropsType>`
  ${props =>
    !props.inner && props.top ? 'margin-top: ' + props.top * 8 + 'px' : ''};
  ${props =>
    !props.inner && props.right
      ? 'margin-right: ' + props.right * 8 + 'px'
      : ''};
  ${props =>
    !props.inner && props.bottom
      ? 'margin-bottom: ' + props.bottom * 8 + 'px'
      : ''};
  ${props =>
    !props.inner && props.left ? 'margin-left: ' + props.left * 8 + 'px' : ''};

  ${props =>
    props.inner && props.top ? 'padding-top: ' + props.top * 8 + 'px' : ''};
  ${props =>
    props.inner && props.right
      ? 'padding-right: ' + props.right * 8 + 'px'
      : ''};
  ${props =>
    props.inner && props.bottom
      ? 'padding-bottom: ' + props.bottom * 8 + 'px'
      : ''};
  ${props =>
    props.inner && props.left ? 'padding-left: ' + props.left * 8 + 'px' : ''};
`

Spacer.displayName = 'Spacer'

export default Spacer
