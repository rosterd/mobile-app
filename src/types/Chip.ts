import {JobStatus} from './JobStatus';
import {Shift} from './Shift';

enum ChipState {
  New = 'New',
}

export type ChipType = Shift | JobStatus | ChipState;

export const Chip = {
  ...ChipState,
  ...Shift,
  ...JobStatus,
};
