import * as React from 'react';
import Svg, {G, Path, Defs, SvgProps} from 'react-native-svg';

function MyJobsIcon(props: SvgProps): JSX.Element {
  return (
    <Svg viewBox='0 0 24 24' fill='none' {...props}>
      <G>
        <Path
          d='M22.25 6H18.5v-.75A2.253 2.253 0 0016.25 3h-4.5A2.253 2.253 0 009.5 5.25V6H5.75a1.502 1.502 0 00-1.5 1.5v12a1.502 1.502 0 001.5 1.5h16.5a1.502 1.502 0 001.5-1.5v-12a1.501 1.501 0 00-1.5-1.5zM11 5.25a.75.75 0 01.75-.75h4.5a.751.751 0 01.75.75V6h-6v-.75zM22.25 7.5l.001 3.9A17.25 17.25 0 0114 13.5a17.25 17.25 0 01-8.25-2.098V7.5h16.5zm-10.125 3.75a.75.75 0 01.75-.75h2.25a.75.75 0 110 1.5h-2.25a.75.75 0 01-.75-.75z'
          fill='currentColor'
        />
      </G>
      <Defs></Defs>
    </Svg>
  );
}

export default MyJobsIcon;
