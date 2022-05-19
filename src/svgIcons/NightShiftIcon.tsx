import * as React from 'react';
import Svg, {Path, SvgProps} from 'react-native-svg';

function SvgComponent(props: SvgProps): JSX.Element {
  return (
    <Svg width={14} height={14} viewBox='0 0 14 14' fill='none' {...props}>
      <Path
        fillRule='evenodd'
        clipRule='evenodd'
        d='M8.398 1.392a.656.656 0 01.687-.153A6.125 6.125 0 111.24 9.085a.656.656 0 01.84-.84A4.812 4.812 0 008.246 2.08a.656.656 0 01.153-.688zm1.414 1.702a6.125 6.125 0 01-6.718 6.718 4.811 4.811 0 106.718-6.718z'
        fill='currentColor'
      />
    </Svg>
  );
}

export default SvgComponent;
