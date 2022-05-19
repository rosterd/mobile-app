import * as React from 'react';
import Svg, {Path, G, Defs, SvgProps} from 'react-native-svg';

function HistoryIcon(props: SvgProps): JSX.Element {
  return (
    <Svg viewBox='0 0 24 24' fill='none' {...props}>
      <Path
        d='M15 7.5V12M18.897 14.25L15 12M9.734 9.348h-3.75v-3.75'
        stroke='currentColor'
        strokeWidth={2}
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <G>
        <Path
          d='M9.166 17.834a8.25 8.25 0 100-11.668L5.984 9.348'
          stroke='currentColor'
          strokeWidth={2}
          strokeLinecap='round'
          strokeLinejoin='round'
        />
      </G>
      <Defs></Defs>
    </Svg>
  );
}

export default HistoryIcon;
