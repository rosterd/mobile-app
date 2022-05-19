import useTheme from 'hooks/useTheme';
import React from 'react';
import DayShiftIcon from 'svgIcons/DayShiftIcon';
import {Chip} from 'types/Chip';
import ChipContainer from './ChipContainer';

const DayShiftChip = (): JSX.Element => {
  const theme = useTheme();
  return (
    <ChipContainer
      name={Chip.DayShift}
      color={theme.colors.dayShiftChipColor}
      backgroundColor={theme.colors.dayShiftChipBg}
      icon={<DayShiftIcon color={theme.colors.dayShiftChipColor} />}
    />
  );
};

export default DayShiftChip;
