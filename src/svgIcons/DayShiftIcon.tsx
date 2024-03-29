import * as React from 'react';
import Svg, {Path, SvgProps} from 'react-native-svg';

function DayShiftIcon(props: SvgProps): JSX.Element {
  return (
    <Svg width={14} height={14} viewBox='0 0 14 14' fill='none' {...props}>
      <Path
        fillRule='evenodd'
        clipRule='evenodd'
        d='M7 9.188a2.188 2.188 0 100-4.376 2.188 2.188 0 000 4.375zM7 10.5a3.5 3.5 0 100-7 3.5 3.5 0 000 7zM7 0a.656.656 0 01.656.656V1.97a.656.656 0 11-1.312 0V.656A.656.656 0 017 0zm0 11.375a.656.656 0 01.656.656v1.313a.656.656 0 01-1.312 0V12.03A.656.656 0 017 11.375zM2.05 2.05a.656.656 0 01.929 0l.927.929a.656.656 0 01-.928.927l-.927-.928a.656.656 0 010-.927zm8.044 8.044a.656.656 0 01.928 0l.928.928a.656.656 0 01-.928.928l-.928-.928a.656.656 0 010-.928zM14 7a.656.656 0 01-.656.656H12.03a.656.656 0 010-1.312h1.313A.656.656 0 0114 7zM2.625 7a.656.656 0 01-.656.656H.656a.656.656 0 010-1.312H1.97A.656.656 0 012.625 7zm9.325-4.95a.656.656 0 010 .929l-.928.927a.656.656 0 11-.928-.928l.928-.927a.656.656 0 01.927 0zm-8.044 8.044a.656.656 0 010 .928l-.928.928a.656.656 0 11-.928-.928l.928-.928a.656.656 0 01.928 0z'
        fill='currentColor'
      />
    </Svg>
  );
}

export default DayShiftIcon;
