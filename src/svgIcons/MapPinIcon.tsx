import * as React from 'react';
import Svg, {Path, SvgProps} from 'react-native-svg';

function MapPinIcon(props: SvgProps): JSX.Element {
  return (
    <Svg width={16} height={16} viewBox='0 0 32 32' fill='none' {...props}>
      <Path
        d='M7 29h18M16 17a4 4 0 100-8 4 4 0 000 8z'
        stroke='currentColor'
        strokeWidth={2}
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <Path
        d='M26 13c0 9-10 16-10 16S6 22 6 13a10 10 0 1120 0v0z'
        stroke='currentColor'
        strokeWidth={2}
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </Svg>
  );
}

export default MapPinIcon;
