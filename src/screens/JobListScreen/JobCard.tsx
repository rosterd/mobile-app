import Card from 'components/Card/Card';
import Text from 'components/Text';
import {Job} from 'types/Job';
import React from 'react';
import DayShiftChip from 'components/Chip/DayShift';
import NewChip from 'components/Chip/NewChip';
import {StyleSheet, View} from 'react-native';
import CardTitle from 'components/Card/CardTitle';
import CardSubtitle from 'components/Card/CardSubtitle';
import useTheme from 'hooks/useTheme';
import TextButton from 'components/Buttons/TextButton';
import SmallText from 'components/SmallText';
import {Shift} from 'types/Shift';
import NightShift from 'components/Chip/NightShift';
import Chips from 'components/Chip/Chips';
import MapPinIcon from 'svgIcons/MapPinIcon';
import IconText from 'components/IconText';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import Ripple from 'components/Ripple';

dayjs.extend(relativeTime);

interface JobCardProps
  extends Pick<
    Job,
    'jobTitle' | 'description' | 'facility' | 'jobPostedDateTimeUtc'
  > {
  onPress: () => void;
  onPressApply: () => void;
  shift?: Shift;
}
const JobCard = ({
  jobTitle,
  description,
  facility,
  jobPostedDateTimeUtc,
  onPress,
  onPressApply,
  shift,
}: JobCardProps): JSX.Element => {
  const theme = useTheme();
  const styles = StyleSheet.create({
    applyButton: {
      alignItems: 'flex-end',
    },
    container: {
      position: 'relative',
      paddingBottom: theme.spacing(4),
    },
    description: {
      marginBottom: theme.spacing(2),
    },
    postDate: {
      position: 'absolute',
      top: 0,
      right: 0,
    },
  });

  return (
    <Card>
      <Ripple
        rippleSize={400}
        rippleOpacity={0.1}
        rippleColor={theme.colors.primary}
        rippleCentered={false}
        onPress={onPress}>
        <View style={styles.container}>
          <View style={styles.postDate}>
            <SmallText>{dayjs(jobPostedDateTimeUtc).fromNow(true)}</SmallText>
          </View>
          <Chips>
            <NewChip />
            {shift === Shift.DayShift && <DayShiftChip />}
            {shift === Shift.NightShift && <NightShift />}
          </Chips>
          <CardTitle>{jobTitle}</CardTitle>
          <CardSubtitle>{facility.facilityName}</CardSubtitle>
          <View style={styles.description}>
            <Text>{description}</Text>
          </View>
          {facility.address && (
            <IconText
              Icon={MapPinIcon}
              color={theme.colors.secondaryText}
              text={facility.address}
            />
          )}
        </View>
      </Ripple>
      <View style={styles.applyButton}>
        <TextButton onPress={onPressApply}>Accept</TextButton>
      </View>
    </Card>
  );
};

export default JobCard;
