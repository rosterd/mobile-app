import React from 'react';
import {JobStatus} from 'types/JobStatus';
import AcceptedChip from './AcceptedChip';
import CancelledChip from './CancelledChip';
import EndStatusChip from './EndStatusChip';
import OngoingChip from './OngoingChip';

interface JobStatusChipProps {
  jobStatus: JobStatus;
}
const JobStatusChip = ({jobStatus}: JobStatusChipProps): JSX.Element => {
  return (
    <>
      {jobStatus === JobStatus.Accepted && <AcceptedChip />}
      {jobStatus === JobStatus.InProgress && <OngoingChip />}
      {jobStatus === JobStatus.Cancelled && <CancelledChip />}
      {jobStatus === JobStatus.Ended && <EndStatusChip />}
    </>
  );
};

export default JobStatusChip;
