import * as React from 'react';
import Svg, {SvgProps, Path} from 'react-native-svg';

const JobListIcon = (props: SvgProps): JSX.Element => {
  return (
    <Svg viewBox='0 0 24 24' color='inherit' fill='none' {...props}>
      <Path
        d='M22.5 11.25a4.505 4.505 0 00-4.5-4.5h-3.748c-.05 0-4.911-.065-9.537-3.945A1.5 1.5 0 002.25 3.953v14.594a1.485 1.485 0 00.865 1.358 1.492 1.492 0 001.6-.21c3.55-2.978 7.24-3.709 8.785-3.887v3.29a1.495 1.495 0 00.668 1.249l1.03.687a1.5 1.5 0 002.288-.884l1.11-4.44a4.506 4.506 0 003.904-4.46zm-6.47 8.536L15 19.099V15.75h2.04l-1.01 4.036zM18 14.25h-3v-6h3a3 3 0 010 6z'
        fill='currentColor'
      />
    </Svg>
  );
};

export default JobListIcon;
