import * as React from 'react';
import Svg, {Path, SvgProps} from 'react-native-svg';

function SignOutIcon(props: SvgProps): JSX.Element {
  return (
    <Svg width={24} height={24} viewBox='0 0 24 24' fill='none' {...props}>
      <Path
        d='M16.314 8.262L20.25 12.2l-3.936 3.938M9.75 12.2h10.497M9.75 20.45H4.5a.75.75 0 01-.75-.75v-15a.75.75 0 01.75-.75h5.25'
        stroke='currentColor'
        strokeWidth={1.5}
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </Svg>
  );
}

export default SignOutIcon;
