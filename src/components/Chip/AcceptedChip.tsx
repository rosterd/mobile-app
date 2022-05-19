import useTheme from 'hooks/useTheme';
import React from 'react';
import {Chip} from 'types/Chip';
import ChipContainer from './ChipContainer';

const AcceptedChip = (): JSX.Element => {
  const theme = useTheme();
  return (
    <ChipContainer
      name={Chip.Accepted}
      color={theme.colors.green}
      backgroundColor={theme.colors.greenLight}
    />
  );
};

export default AcceptedChip;
