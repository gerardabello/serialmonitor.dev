import React from 'react'
import Switch from 'react-switch'
import { withTheme } from 'styled-components'

const HEIGHT = 28

const CustomSwitch = ({
  checked,
  dataQa,
  onChange,
  checkedIcon,
  uncheckedIcon,
  theme
}) => (
  <div data-qa={dataQa} style={{ height: `${HEIGHT}px` }}>
    <Switch
      checked={checked}
      onChange={onChange}
      handleDiameter={20}
      offColor={theme.textColor}
      onColor={theme.highlightColor}
      offHandleColor={theme.backgroundColor}
      onHandleColor={theme.textColor}
      activeBoxShadow={`${theme.focusColor} 0px 0px 0px 4px`}
      height={28}
      width={54}
      uncheckedIcon={uncheckedIcon}
      checkedIcon={checkedIcon}
    />
  </div>
)

export default withTheme(CustomSwitch)
