import React from 'react';
import {View, StyleSheet, Dimensions} from 'react-native';
import Button, {ButtonVariant} from './Buttons/Button';
import useTheme from 'hooks/useTheme';

type Value = string | number;
type SelectedValues = {
  [key: string]: boolean;
};
interface ButtonOptionsProps {
  options: Array<{
    label: string;
    value: Value;
  }>;
  selectedValues: SelectedValues;
  onUpdateValues: (newValues: SelectedValues) => void;
}

const ButtonOptions = ({
  options,
  selectedValues,
  onUpdateValues,
}: ButtonOptionsProps): JSX.Element => {
  const theme = useTheme();
  const buttonMarginRight = theme.spacing(3);
  const sidePadding = 16 * 2;
  const styles = StyleSheet.create({
    container: {
      flexWrap: 'wrap',
      flexDirection: 'row',
    },
    button: {
      alignItems: 'center',
      width:
        (Dimensions.get('screen').width - sidePadding) / 3 -
        (buttonMarginRight * 2) / 3,
      marginBottom: theme.spacing(3),
      marginRight: buttonMarginRight,
    },
    textStyle: {
      fontSize: 14,
    },
    lastInRow: {
      marginRight: 0,
    },
  });

  const setNewValues = React.useCallback(
    (option, value) => {
      const newValues = {...selectedValues};
      newValues[option] = value;
      onUpdateValues(newValues);
    },
    [selectedValues, onUpdateValues],
  );

  return (
    <View style={styles.container}>
      {options.map(({label, value}, index) => (
        <Button
          key={`${value}-${index}`}
          style={[styles.button, (index + 1) % 3 === 0 && styles.lastInRow]}
          textStyle={[styles.textStyle]}
          onPress={() => setNewValues(value, !selectedValues[value])}
          variant={
            selectedValues?.[value]
              ? ButtonVariant.Accent
              : ButtonVariant.Disabled
          }>
          {label}
        </Button>
      ))}
    </View>
  );
};

export default ButtonOptions;
