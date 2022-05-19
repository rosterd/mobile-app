import useTheme from 'hooks/useTheme';
import React from 'react';
import NightShiftIcon from 'svgIcons/NightShiftIcon';
import {Chip} from 'types/Chip';
import ChipContainer from './ChipContainer';

const NightShift = (): JSX.Element => {
  const theme = useTheme();
  return (
    <ChipContainer
      name={Chip.NightShift}
      color={theme.colors.blue}
      backgroundColor={theme.colors.blueLight}
      icon={<NightShiftIcon color={theme.colors.blue} />}
    />
  );
};

export default NightShift;
