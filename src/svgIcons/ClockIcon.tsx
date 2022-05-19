import * as React from 'react';
import Svg, {Path, SvgProps} from 'react-native-svg';

function ClockIcon(props: SvgProps): JSX.Element {
  return (
    <Svg width={16} height={16} viewBox='0 0 16 16' fill='none' {...props}>
      <Path
        d='M8 14A6 6 0 108 2a6 6 0 000 12z'
        stroke='currentColor'
        strokeWidth={1.004}
        strokeMiterlimit={10}
      />
      <Path
        d='M8 4.5V8h3.5'
        stroke='currentColor'
        strokeWidth={1.004}
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </Svg>
  );
}

export default ClockIcon;
