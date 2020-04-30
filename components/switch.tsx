import React from 'react'
import Switch from 'react-switch'
import { withTheme } from 'styled-components'

import { Theme } from './theme-provider'

const HEIGHT = 28

type PropsType = {
  checked: boolean;
  dataQa?: string;
  onChange: (checked: boolean) => void;
  checkedIcon?: JSX.Element;
  uncheckedIcon?: JSX.Element;
  theme: Theme;
}

const CustomSwitch: React.FunctionComponent<PropsType> = ({
  checked,
  dataQa,
  onChange,
  checkedIcon,
  uncheckedIcon,
  theme,
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
