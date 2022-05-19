import useTheme from 'hooks/useTheme';
import React from 'react';
import {Chip} from 'types/Chip';
import ChipContainer from './ChipContainer';

const CancelledChip = (): JSX.Element => {
  const theme = useTheme();
  return (
    <ChipContainer
      name={Chip.Cancelled}
      color={theme.colors.red}
      backgroundColor={theme.colors.redLight}
    />
  );
};

export default CancelledChip;
