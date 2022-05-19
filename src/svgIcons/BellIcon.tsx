import * as React from 'react';
import Svg, {G, Path, Defs, SvgProps} from 'react-native-svg';
/* SVGR has dropped some elements not supported by react-native-svg: filter */

const BellIcon = (props: SvgProps): JSX.Element => {
  return (
    <Svg width={24} height={24} viewBox='0 0 24 24' fill='none' {...props}>
      <G>
        <Path
          d='M21.701 16.494c-.556-.957-1.22-2.775-1.22-5.994v-.665c0-4.152-3.33-7.554-7.424-7.585H13a7.49 7.49 0 00-7.481 7.5v.75c0 3.219-.664 5.036-1.22 5.994a1.5 1.5 0 001.293 2.256H9.25a3.75 3.75 0 007.5 0h3.658a1.5 1.5 0 001.293-2.256zM13 21a2.252 2.252 0 01-2.25-2.25h4.5A2.253 2.253 0 0113 21z'
          fill='currentColor'
        />
      </G>
      <Defs></Defs>
    </Svg>
  );
};

export default BellIcon;
