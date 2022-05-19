import * as React from 'react';
import {View, StyleSheet} from 'react-native';
import SubTitle from './SubTitle';
import useTheme from 'hooks/useTheme';
import Title from './Title';

interface TitleCardProps {
  title: string;
  subTitle: string;
}

const TitleCard = ({title, subTitle}: TitleCardProps): JSX.Element => {
  const theme = useTheme();
  const styles = StyleSheet.create({
    card: {
      backgroundColor: theme.colors.white,
      paddingHorizontal: theme.spacing(4),
      paddingVertical: theme.spacing(6),
    },
  });
  return (
    <View style={styles.card}>
      <Title>{title}</Title>
      <SubTitle>{subTitle}</SubTitle>
    </View>
  );
};

export default TitleCard;
