export enum Colors {
  white = '#fff',
  primary = '#0B1C5E',
  secondary = '#007EFF',
  secondaryLight = '#ADBDF7',
  accent = '#2EDBAD',
  primaryText = '#25282B',
  secondaryText = '#828282',
  border = '#E8E8E8',
  cardBackgroud = '#F1F3F6',
  black = '#000',
  greyBg = '#F1F3F6',
  dayShiftChipBg = '#FFF4BA',
  dayShiftChipColor = '#AC7407',
  green = '#2D7721',
  greenLight = '#CAFFD1',
  redLight = '#FAE5E3',
  red = '#E15241',
  redDark = '#FB4E4E',
  blueLight = '#E8EFFD',
  blue = '#0051F8',
  yellowLight = '#FFEED4',
  yellow = '#F97700',
  borderColor = '#E6E6E6',
  disabledBg = '#F3F5FE',
  disabledText = '#A6A6A6',
  inputText = '#CACCCF',
}

const theme = {
  colors: Colors,
  icons: {
    navIconSize: 24,
  },
  spacing: (value: number): number => {
    return 4 * value;
  },
  typography: {
    smallText: {
      fontSize: 12,
      fontFamily: 'Roboto_400Regular',
    },
    chipText: {
      fontSize: 14,
      fontFamily: 'Roboto_500Medium',
    },
    medium: {
      fontFamily: 'Roboto_500Medium',
    },
    base: {
      fontSize: 16,
      fontFamily: 'Roboto_400Regular',
      lineHeight: 24,
    },
    jobTitle: {
      fontSize: 16,
      fontFamily: 'Roboto_400Regular',
    },
    h1: {
      fontSize: 26,
      lineHeight: 30,
      fontFamily: 'Roboto_700Bold',
    },
    h2: {
      fontSize: 20,
      fontFamily: 'Roboto_700Bold',
    },
    cardTitle: {
      fontSize: 16,
      fontFamily: 'Roboto_500Medium',
      lineHeight: 22,
    },
    cardSubtitle: {
      fontSize: 14,
      fontFamily: 'Roboto_400Regular',
    },
    subtitle: {
      fontSize: 15,
      fontFamily: 'Roboto_400Regular',
    },
    nav: {
      fontSize: 12,
    },
  },
  shadow: {
    shadowOpacity: 0.15,
    shadowColor: Colors.black,
    shadowRadius: 15,
    shadowOffset: {width: -1, height: 0},
  },
};

export default theme;
