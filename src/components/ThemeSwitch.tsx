import React, { useContext, memo } from 'react';
import { ThemeContext } from 'styled-components';
import Switch from 'react-switch';
import { shade } from 'polished';

const ThemeSwitch: React.FC<{ toggleTheme: () => void }> = ({ toggleTheme }) => {
  const theme = useContext(ThemeContext);

  if(!theme) {
    return null;
  }

  const { colors, title } = theme;

  return (
    <Switch
      onChange={toggleTheme}
      checked={title === 'dark'}
      checkedIcon={false}
      uncheckedIcon={false}
      width={40}
      handleDiameter={20}
      offColor={shade(0.3, colors.primary)}
      onColor={shade(0.2, colors.secondary)}
    />
  );
};

export default memo(ThemeSwitch);
