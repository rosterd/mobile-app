import useTheme from 'hooks/useTheme';
import React from 'react';
import {Chip} from 'types/Chip';
import ChipContainer from './ChipContainer';

const NewChip = (): JSX.Element => {
  const theme = useTheme();
  return (
    <ChipContainer
      name={Chip.New}
      color={theme.colors.green}
      backgroundColor={theme.colors.greenLight}
    />
  );
};

export default NewChip;
