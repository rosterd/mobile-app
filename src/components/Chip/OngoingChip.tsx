import useTheme from 'hooks/useTheme';
import React from 'react';
import ChipContainer from './ChipContainer';

const OngoingChip = (): JSX.Element => {
  const theme = useTheme();
  return (
    <ChipContainer
      name='In Progress'
      color={theme.colors.yellow}
      backgroundColor={theme.colors.yellowLight}
    />
  );
};

export default OngoingChip;
